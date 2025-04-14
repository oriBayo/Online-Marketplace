using System.Text.Json;
using StackExchange.Redis;

public class RedisService
{
    private readonly ConnectionMultiplexer _redis;
    private readonly IDatabase _db;
    private readonly ILogger<RedisService> _logger;

    public RedisService(string connectionString, ILogger<RedisService> logger)
    {
        _redis = ConnectionMultiplexer.Connect(connectionString);
        _db = _redis.GetDatabase();
        _logger = logger;
    }

    public async Task CacheNotification(Notification notification)
    {
        string notificationStr = JsonSerializer.Serialize<Notification>(notification);
        await _db.ListLeftPushAsync($"notifications:{notification.UserId}", notificationStr);
        await _db.ListTrimAsync($"notifications:{notification.UserId}", 0, 9);

        // Log the current cache state
        var currentCache = await GetCachedNotifications(notification.UserId!);
        _logger.LogInformation($"Cache state for user {notification.UserId}:");
        foreach (var item in currentCache)
        {
            _logger.LogInformation($"ID: {item.Id}, Message: {item.Message}, CreatedAt: {item.CreatedAt}");
        }
    }

    public async Task UpdateNotification(Notification notification)
    {
        var cachedNotifications = await GetCachedNotifications(notification.UserId!);

        _logger.LogInformation($"Attempting to update notification {notification.Id}");
        _logger.LogInformation($"Current cache state: {JsonSerializer.Serialize(cachedNotifications)}");

        if (!cachedNotifications.Any())
        {
            _logger.LogWarning($"No cached notifications found for user {notification.UserId}");
            return;
        }

        int index = cachedNotifications.ToList().FindIndex(n => n.Id == notification.Id);
        if (index == -1)
        {
            _logger.LogWarning($"Notification {notification.Id} not found in cache");
            return;
        }

        string notificationStr = JsonSerializer.Serialize(notification);
        await _db.ListSetByIndexAsync($"notifications:{notification.UserId}", index, notificationStr);

        // Log the updated cache state
        var updatedCache = await GetCachedNotifications(notification.UserId!);
        _logger.LogInformation($"Updated cache state:");
        foreach (var item in updatedCache)
        {
            _logger.LogInformation($"ID: {item.Id}, Message: {item.Message}, CreatedAt: {item.CreatedAt}");
        }
    }

    public async Task<IEnumerable<Notification>> GetCachedNotifications(string userId)
    {
        var notifications = await _db.ListRangeAsync($"notifications:{userId}", 0, 9);
        return notifications.Select(n => JsonSerializer.Deserialize<Notification>(n))!;
    }
}