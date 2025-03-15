// using TalentMesh.Module.Job.Domain.Events;
// using MediatR;
// using Microsoft.Extensions.Logging;

// namespace TalentMesh.Starter.WebApi.Catalog.Application.Brands.EventHandlers;

// public class JobCreatedEventHandler(ILogger<JobCreatedEventHandler> logger) : INotificationHandler<JobCreated>
// {
//     public async Task Handle(JobCreated notification,
//         CancellationToken cancellationToken)
//     {
//         logger.LogInformation("handling User created domain event..");
//         await Task.FromResult(notification);
//         logger.LogInformation("finished handling User created domain event..");
//     }
// }


using TalentMesh.Module.Job.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;
using TalentMesh.Framework.Infrastructure.Messaging;
using TalentMesh.Framework.Infrastructure.SignalR;
using Microsoft.AspNetCore.SignalR;

namespace TalentMesh.Module.Job.Application.Jobs.EventHandlers
{
    public class JobCreatedEventHandler : INotificationHandler<JobCreated>
    {
        private readonly ILogger<JobCreatedEventHandler> _logger;
        private readonly IMessageBus _messageBus;
        private readonly IHubContext<NotificationHub> _hubContext;



        public JobCreatedEventHandler(ILogger<JobCreatedEventHandler> logger, IMessageBus messageBus, IHubContext<NotificationHub> hubContext)
        {
            _logger = logger;
            _messageBus = messageBus;
            _hubContext = hubContext;
        }

        public async Task Handle(JobCreated notification, CancellationToken cancellationToken)
        {
            if (notification.Job is not null)
            {
                _logger.LogInformation("Handling JobCreated event for Job ID: {JobId}", notification.Job.Id);

                // Prepare a message object with details from the job.
                var jobMessage = new
                {
                    JobId = notification.Job.Id,
                    Name = notification.Job.Name,
                    Description = notification.Job.Description,
                };

                // Publish the message to a RabbitMQ exchange.
                // Example: Exchange "job.events", Routing Key "job.created"
                await _messageBus.PublishAsync(jobMessage, exchange: "job.events", routingKey: "job.created", cancellationToken);
                // await _hubContext.Clients.All.SendAsync("ReceiveMessage", notification.Job.Id, notification.Job.Name);
                await _hubContext.Clients.Group("admin").SendAsync("ReceiveMessage", "New Order is Placed");

                _logger.LogInformation("Published JobCreated message for Job ID: {JobId}", notification.Job.Id);
            }
            else
            {
                _logger.LogWarning("JobCreated event received without a valid Job entity.");
            }
        }
    }
}

