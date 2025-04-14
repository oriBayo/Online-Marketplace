using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.SignalR;

var builder = WebApplication.CreateBuilder(args);
var redisConnectionString = builder.Configuration.GetConnectionString("Redis");

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddLogging();

builder.Services.AddDbContext<NotificationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services.AddSingleton<IUserIdProvider, CustomUserProvider>();

builder.Services.AddSingleton<RedisService>(sp =>
{
    var logger = sp.GetRequiredService<ILogger<RedisService>>();
    var configuration = sp.GetRequiredService<IConfiguration>();
    var redisConnectionString = configuration.GetValue<string>("Redis:ConnectionString") ?? "localhost:6379";

    return new RedisService(redisConnectionString, logger);
});

builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddSingleton<RabbitMQConsumer>();
builder.Services.AddHostedService<RabbitMQBackgroundService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
});

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseRouting();
app.UseAuthorization();
app.MapControllers();
app.MapHub<SignalRNotificationHub>("/notifications-hub");

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<NotificationDbContext>();
    db.Database.Migrate();
}

app.Run();
