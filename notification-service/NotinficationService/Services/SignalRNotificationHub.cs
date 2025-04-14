using Microsoft.AspNetCore.SignalR;

public class SignalRNotificationHub : Hub
{
    public async Task SendNotification(string userId, string message)
    {
        await Clients.User(userId).SendAsync(userId, message);
    }
}
