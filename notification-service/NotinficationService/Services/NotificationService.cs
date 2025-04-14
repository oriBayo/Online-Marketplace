using Microsoft.EntityFrameworkCore;

public class NotificationService : INotificationService
{
    private readonly NotificationDbContext _context;
    private readonly RedisService _redisService;

    public NotificationService(NotificationDbContext context, RedisService redisService)
    {
        _redisService = redisService;
        _context = context;
    }

    public async Task<Notification> AddAsync(string userId, string message)
    {
        var notification = new Notification
        {
            UserId = userId,
            Message = message,
            CreatedAt = DateTime.UtcNow
        };
        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();
        return notification;
    }

    public Task<IEnumerable<Notification>> GetAllAsync(string userId)
    {
        throw new NotImplementedException();
    }

    public Task<Notification> GetByIdAsync(string notificationId)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateAsync(Notification notification)
    {
        _context.Notifications.Update(notification);
        await _context.SaveChangesAsync();
        await _redisService.UpdateNotification(notification);
    }

    public Task<bool> DeleteAsync(string notificationId)
    {
        throw new NotImplementedException();
    }
}