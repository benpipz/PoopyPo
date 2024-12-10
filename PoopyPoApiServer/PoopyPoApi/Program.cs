using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Data;
using PoopyPoApi.Repositories;
using PoopyPoApi.Services;
using RabbitMQInfrastructure;
using RabbitMQInfrastructure.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connection = builder.Configuration["PoopyPoConnectionString"];
builder.Services.AddDbContext<PoopyDbContext>(options =>
    options.UseSqlServer(builder.Configuration["PoopyPoConnectionString"]));
builder.Services.AddScoped<ILocationRepository, SQLLocationRepository>();
builder.Services.AddScoped<IPointsService, PointsService>();
builder.Services.AddScoped<IUsersRepository, SQLUserRepository>();
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddSingleton<IMessageQueueService, RabbitMqService>();

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
    options.AddPolicy("AllMySpecificOrigins",
        policy => policy.WithOrigins("https://localhost:7086").AllowAnyMethod().AllowAnyHeader()
        );
}
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllMySpecificOrigins");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
