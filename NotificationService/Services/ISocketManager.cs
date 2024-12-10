namespace NotificationService.Services
{
    public interface ISocketManager
    {
        public void AddSocket(object socket);
        public void RemoveSocket(object socket);

    }
}
