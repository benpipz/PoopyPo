
namespace RabbitMQInfrastructure.Interfaces
{
    public interface IMessageQueueService
    {
        public void Publish(string routingKey, object message);

        public void Subscribe(string queueName, Action<object> onMessageReceived);
    }
}
