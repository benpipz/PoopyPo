using NotificationService.Services;
using RabbitMQInfrastructure;
using RabbitMQInfrastructure.Interfaces;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin", policy =>
    {
        policy.AllowAnyOrigin()  // Allow any origin
              .AllowAnyHeader()  // Allow any headers
              .AllowAnyMethod(); // Allow any method (GET, POST, PUT, DELETE, etc.)
    });
});
builder.Services.AddSingleton<IMessageQueueConsumer, RabbitMQConsumer>();
builder.Services.AddSingleton<IMessageQueueService, RabbitMqService>();
builder.Services.AddSingleton<ISocketManager,WebScokertManager>();

var app = builder.Build();

app.UseWebSockets();
//app.UseHttpsRedirection();

//app.UseAuthorization();
app.UseCors("AllowAnyOrigin");

app.MapControllers();

app.Run();
