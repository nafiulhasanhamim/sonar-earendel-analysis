using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace TalentMesh.Module.Job.Infrastructure.Messaging
{
    public class JobCreatedConsumer : BackgroundService
    {
        private readonly ILogger<JobCreatedConsumer> _logger;
        private readonly IConnectionFactory _connectionFactory;
        private IConnection? _connection;
        private IModel? _channel;
        private const string ExchangeName = "job.events";
        private const string QueueName = "skills.job.created";

        public JobCreatedConsumer(ILogger<JobCreatedConsumer> logger, IConnectionFactory connectionFactory)
        {
            _logger = logger;
            _connectionFactory = connectionFactory;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _connection = _connectionFactory.CreateConnection();
            _channel = _connection.CreateModel();

            // Declare the exchange and queue, and bind them together
            _channel.ExchangeDeclare(ExchangeName, ExchangeType.Direct, durable: true);
            _channel.QueueDeclare(QueueName, durable: true, exclusive: false, autoDelete: false, arguments: null);
            _channel.QueueBind(QueueName, ExchangeName, "job.created");

            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.Received += async (sender, ea) =>
            {
                _logger.LogInformation("hello..........");
                var body = ea.Body.ToArray();
                var messageJson = Encoding.UTF8.GetString(body);
                // Deserialize message (assuming anonymous object structure as used in publisher)
                var message = JsonSerializer.Deserialize<dynamic>(messageJson);

                _logger.LogInformation("Received JobCreated message: {Message}", messageJson);
                
                // Process the message (e.g., update a dashboard, trigger notifications, etc.)
                // ... Your processing logic here ...

                // Acknowledge message processing
                _channel.BasicAck(ea.DeliveryTag, multiple: false);
                await Task.CompletedTask;
            };

            _channel.BasicConsume(queue: QueueName, autoAck: false, consumer: consumer);

            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
            base.Dispose();
        }
    }
}
