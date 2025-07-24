using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Data;
using PoopyPoApi.Repositories;
using PoopyPoApi.Services;
using RabbitMQInfrastructure;
using RabbitMQInfrastructure.Interfaces;
using RedisInfrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connection = builder.Configuration.GetConnectionString("PoopyPoConnectionString");
builder.Services.AddDbContext<PoopyDbContext>(options =>
    options.UseSqlServer(connection));
builder.Services.AddScoped<ILocationRepository, SQLLocationRepository>();
builder.Services.AddScoped<IPointsService, PointsService>();
builder.Services.AddScoped<IUsersRepository, SQLUserRepository>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddSingleton<IMessageQueueService, RabbitMqService>();
builder.Services.AddSingleton<ICacheService>(provider => new RedisService("localhost:6379"));

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 100 * 1024 * 1024;
});
builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = 100 * 1024 * 1024;
});

builder.Services.AddCors(options =>
{
    //options.AddPolicy("AllMySpecificOrigins", policy =>
    //{
    //    policy.WithOrigins("http://localhost:5173", "https://192.168.68.63:5173")
    //          .AllowAnyMethod()
    //          .AllowAnyHeader();
    //});
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
}
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    //app.UseCors("AllMySpecificOrigins");
    app.UseCors("AllowAll");

}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
