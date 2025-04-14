public interface INotificationService
{
    Task<Notification> AddAsync(string userId, string message);
    Task<IEnumerable<Notification>> GetAllAsync(string userId);
    Task<Notification> GetByIdAsync(string notificationId);
    Task UpdateAsync(Notification notification);
    Task<bool> DeleteAsync(string notificationId);
}