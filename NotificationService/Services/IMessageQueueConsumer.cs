namespace NotificationService.Services
{
    public interface IMessageQueueConsumer
    {
        public void Subscribe(Action<object> onMessageReceived);
    }
}
