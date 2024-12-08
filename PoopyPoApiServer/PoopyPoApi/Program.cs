using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PoopyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PoopyPoConnectionString")));
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
