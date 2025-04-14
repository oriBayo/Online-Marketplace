public class RabbitMQBackgroundService : BackgroundService
{
    private readonly RabbitMQConsumer _rabbitMQConsumer;

    public RabbitMQBackgroundService(RabbitMQConsumer rabbitMQConsumer)
    {
        _rabbitMQConsumer = rabbitMQConsumer;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        Console.WriteLine("🐇 RabbitMQ background service starting...");
        await _rabbitMQConsumer.StartListening();
    }
}