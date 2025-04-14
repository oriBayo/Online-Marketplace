using System.Text;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

public class RabbitMQConsumer : IDisposable
{
    private readonly IHubContext<SignalRNotificationHub> _hubContext;
    private readonly IServiceScopeFactory _serviceScopeFactory;
    private IConnection? _connection;
    private IChannel? _channel;
    public RabbitMQConsumer(IServiceScopeFactory serviceScopeFactory, IHubContext<SignalRNotificationHub> hubContext)
    {
        _serviceScopeFactory = serviceScopeFactory;
        _hubContext = hubContext;

    }
    public async Task StartListening()
    {
        await SetRMQConnection();
        await SetRMQChannel();

        var consumer = new AsyncEventingBasicConsumer(_channel);
        consumer.ReceivedAsync += async (model, ea) =>
{
    var notification = await ConvertRMQMessageToCreateNotificationRequest(ea);
    if (notification?.Message == null || notification?.UserId == null)
    {
        Console.WriteLine("Invalid notification received.");
        await _channel.BasicNackAsync(ea.DeliveryTag, false, false);
        return;
    }
    try
    {
        Console.WriteLine($"UserId:{notification.UserId}, Message:{notification.Message}");
        await ProcessNotificationWithScope(notification);
        await _channel.BasicAckAsync(ea.DeliveryTag, false);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error processing message: {ex.Message}");
        await _channel.BasicNackAsync(ea.DeliveryTag, false, true);
    }
};
        await _channel.BasicConsumeAsync(queue: "notificationQueue", autoAck: false, consumer: consumer);
    }

    private async Task SetRMQChannel()
    {
        _channel = await _connection.CreateChannelAsync();

        _channel.QueueDeclareAsync(queue: "notificationQueue", durable: false, exclusive: false, autoDelete: false, arguments: null).Wait();
    }

    private async Task SetRMQConnection()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        _connection = await factory.CreateConnectionAsync();
    }

    private async Task ProcessNotificationWithScope(CreateNotificationRequest notification)
    {
        using var scope = _serviceScopeFactory.CreateScope();
        var notificationService = scope.ServiceProvider.GetRequiredService<INotificationService>();
        var redisService = scope.ServiceProvider.GetRequiredService<RedisService>();

        var savedNotifications = await notificationService.AddAsync(notification.UserId!, notification.Message!);
        await redisService.CacheNotification(savedNotifications);
        await SendNotificationInSignalR(savedNotifications);
    }

    private CreateNotificationRequest CreateNotificationRequest(string message)
    {
        var notification = JsonConvert.DeserializeObject<CreateNotificationRequest>(message);
        if (notification == null)
        {
            throw new Exception("Deserialized notification is null.");
        }
        return notification;
    }

    private async Task<CreateNotificationRequest> ConvertRMQMessageToCreateNotificationRequest(BasicDeliverEventArgs ea)
    {
        try
        {
            if (_channel == null)
            {
                Console.WriteLine("Channel is null, unable to process message.");
                return null;
            }
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            return CreateNotificationRequest(message);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deserializing message: {ex.Message}");
            await _channel.BasicNackAsync(ea.DeliveryTag, false, false);
            return null;
        }
    }

    private async Task SendNotificationInSignalR(Notification notification)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveNotification", notification);
        Console.WriteLine("Notification sent to SignalR.");
    }

    public void Dispose()
    {
        _channel?.CloseAsync();
        _connection?.CloseAsync();
        _channel?.Dispose();
        _connection?.Dispose();
    }
}