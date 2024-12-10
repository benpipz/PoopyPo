using Microsoft.AspNetCore.Mvc;
using NotificationService.Services;
using System.Net.WebSockets;

namespace NotificationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Notification(ISocketManager socketManager) : ControllerBase
    {
        private readonly ISocketManager _socketManager = socketManager;

        [HttpGet]
        [HttpGet("ws")]
        public async Task Connect()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                _socketManager.AddSocket(webSocket);


                await HandleWebSocketCommunication(webSocket);

            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }

        private async Task HandleWebSocketCommunication(WebSocket webSocket)
        {
            try
            {

                var buffer = new byte[1024 * 4];


                while (webSocket.State == WebSocketState.Open)
                {
                    var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by the client", CancellationToken.None);
                        _socketManager.RemoveSocket(webSocket);
                        return;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("ex in webscoket");
            }
        }
    }
}
