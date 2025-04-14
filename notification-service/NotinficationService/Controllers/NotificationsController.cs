using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public NotificationsController(RedisService redisService, INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpDelete("{id}")]
    public Task<bool> Delete(string id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Notification>> GetAll(string userId)
    {
        throw new NotImplementedException();
    }

    [HttpGet("{id}")]
    public Task<Notification> GetById(string notificationId)
    {
        throw new NotImplementedException();
    }

    [HttpPost]
    public async Task<IActionResult> Update(Notification notification)
    {
        try
        {
            if (notification == null || string.IsNullOrWhiteSpace(notification.Id.ToString()))
            {
                return await Task.FromResult<IActionResult>(BadRequest("Invalid notification data."));
            }

            await _notificationService.UpdateAsync(notification);
            return await Task.FromResult<IActionResult>(Ok("Notification updated successfully."));
        }
        catch (Exception)
        {
            return await Task.FromResult<IActionResult>(StatusCode(500, "Internal server error"));
        }
    }

    [HttpPost("updateToRead")]
    public async Task<IActionResult> UpdateToRead(Notification notification)
    {
        try
        {
            if (notification == null || string.IsNullOrWhiteSpace(notification.Id.ToString()))
            {
                return await Task.FromResult<IActionResult>(BadRequest("Invalid notification data."));
            }
            notification.IsRead = true;
            await _notificationService.UpdateAsync(notification);
            return await Task.FromResult<IActionResult>(Ok("Notification updated successfully."));
        }
        catch (Exception)
        {
            return await Task.FromResult<IActionResult>(StatusCode(500, "Internal server error"));
        }
    }
}