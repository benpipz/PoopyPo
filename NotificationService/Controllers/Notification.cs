using Microsoft.AspNetCore.Mvc;
using System.Net.WebSockets;
using System.Text;

namespace NotificationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Notification : ControllerBase
    {

        private List<WebSocket> _websockets = new();

        [HttpGet]
        [HttpGet("ws")]
        public async Task Connect()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
                _websockets.Add(webSocket);

                _ = Task.Run(async () =>
                {
                    await HandleWebSocketCommunication(webSocket);
                });
                while (true)
                {

                }
            }
            else
            {
                //HttpContext.Response.StatusCode = 400;
            }
        }

        private async Task HandleWebSocketCommunication(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            while (true)
            {

                while (webSocket.State == WebSocketState.Open)
                {
                    var responseMessage = "h222i";
                    var responseBytes = Encoding.UTF8.GetBytes(responseMessage);
                    await webSocket.SendAsync(new ArraySegment<byte>(responseBytes), WebSocketMessageType.Text, true, CancellationToken.None);
                    Thread.Sleep(5000);

                }
            }
        }
    }
}
