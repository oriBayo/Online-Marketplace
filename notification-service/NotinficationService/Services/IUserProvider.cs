using Microsoft.AspNetCore.SignalR;

public class CustomUserProvider : IUserIdProvider
{
    public string? GetUserId(HubConnectionContext connection)
    {
        return connection.User?.FindFirst("userId")?.Value;
    }
}