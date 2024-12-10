using System.Net.WebSockets;
using System.Text;

namespace NotificationService.Services
{
    public class WebScokertManager : ISocketManager
    {
        private readonly List<WebSocket> _websockets = new();
        private readonly IMessageQueueConsumer _mqService;

        public WebScokertManager(IMessageQueueConsumer mqService)
        {
            _mqService = mqService;
            _mqService.Subscribe(async (message) =>
            {
                string msg = $"amount of webscokets: {_websockets.Count}";
                foreach (WebSocket ws in _websockets)
                {
                    if(ws.State == WebSocketState.Open)
                    {

                    var responseBytes = Encoding.UTF8.GetBytes(msg);
                    await ws.SendAsync(new ArraySegment<byte>(responseBytes), WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    else
                    {
                        _websockets.Remove(ws);
                    }
                }
            });
        }

        public void AddSocket(object socket)
        {
            _websockets.Add((WebSocket)socket);
        }

        public void RemoveSocket(object socket)
        {
            _websockets.Remove((WebSocket)socket);
        }
    }
}
