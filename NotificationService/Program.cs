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
var app = builder.Build();

app.UseWebSockets();
//app.UseHttpsRedirection();

//app.UseAuthorization();
app.UseCors("AllowAnyOrigin");

app.MapControllers();

app.Run();
