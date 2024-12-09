using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQInfrastructure.Interfaces;
using System.Text;


namespace RabbitMQInfrastructure
{
    public class RabbitMqService : IMessageQueueService
    {
        private readonly IConnection _connection;
        private readonly IChannel _channel;
        private const string _exchange = "PoopyPo.Notifications";
        private const string _queueName = "updates";
        public RabbitMqService()
        {
            var factory = new ConnectionFactory
            {
                HostName = "localhost",
                UserName = "guest",
                Password = "guest"
            };
            _connection = factory.CreateConnectionAsync().Result;
            _channel = _connection.CreateChannelAsync().Result;
            _channel.ExchangeDeclareAsync(_exchange, ExchangeType.Topic, true, false);
            var queue = _channel.QueueDeclareAsync(_queueName, true, false, false).Result;
            _channel.QueueBindAsync(_queueName,_exchange,"poopypo.notifications.*");
        }

        public async void Publish(string routingKey, object message)
        {
            var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));
            await _channel.BasicPublishAsync(_exchange, routingKey, false, body);
        }

        public async void Subscribe(string queueName, Action<object> onMessageReceived)
        {
            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.ReceivedAsync += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                var deserializedMessage = JsonConvert.DeserializeObject<object>(message);
                onMessageReceived(deserializedMessage);
            };
            _ = await _channel.BasicConsumeAsync(queueName, true, consumer);
        }
    }

}
