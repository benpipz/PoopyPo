
using RabbitMQInfrastructure;
using RabbitMQInfrastructure.Interfaces;

namespace NotificationService.Services
{
    public class RabbitMQConsumer (IMessageQueueService mqConsumer): IMessageQueueConsumer
    {
        private readonly IMessageQueueService _mqService = mqConsumer;

        public void Subscribe(Action<object> onMessageReceived)
        {
            _mqService.Subscribe("updates", onMessageReceived);
        }
    }
}
