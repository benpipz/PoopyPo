using Microsoft.AspNetCore.WebSockets;

var builder = WebApplication.CreateBuilder(args);

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

// Define downstream services
var services = new Dictionary<string, string>
{
    { "api", "https://localhost:7236/api" },
    { "notification", "https://localhost:5179/api" }

};


// Custom Gateway Logic
app.Map("/ws", async context =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        // Route WebSocket requests to another service or handle locally
    }
    else
    {
        context.Response.StatusCode = 400;  // Bad request if not a WebSocket
    }
});
// Custom Gateway Logic
app.Map("/{service}/{*path}", async (string service, string? path, HttpContext context) =>
{
    if (!services.TryGetValue(service, out var baseUrl))
    {
        context.Response.StatusCode = 404;
        await context.Response.WriteAsync($"Service '{service}' not found.");
        return;
    }

    // Build target URI
    var targetUri = $"{baseUrl}/{path}";
    using var httpClient = new HttpClient();

    // Create new request to downstream service
    var request = new HttpRequestMessage(new HttpMethod(context.Request.Method), targetUri);

    // Copy headers
    foreach (var header in context.Request.Headers)
    {
        request.Headers.TryAddWithoutValidation(header.Key, header.Value.ToArray());
    }

    // Copy content if present
    if (context.Request.ContentLength > 0)
    {
        request.Content = new StreamContent(context.Request.Body);
        var contentType = context.Request.ContentType;
        if (contentType != null)
        {
            request.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);
        }
    }

    // Forward the request and handle the response
    var response = await httpClient.SendAsync(request);
    context.Response.StatusCode = (int)response.StatusCode;

    foreach (var header in response.Headers)
    {
        context.Response.Headers[header.Key] = header.Value.ToArray();
    }

    foreach (var header in response.Content.Headers)
    {
        context.Response.Headers[header.Key] = header.Value.ToArray();
    }

    await response.Content.CopyToAsync(context.Response.Body);

});
app.UseCors("AllowAnyOrigin");
app.Run();
