﻿using MediatR;
using Microsoft.Extensions.Logging;
using TalentMesh.Module.Evaluator.Domain.Events;

namespace Evaluator.Application.Interviewer.EventHandlers.v1
{
    public class InterviewerAvailabilityCreatedEventHandler(ILogger<InterviewerAvailabilityCreatedEventHandler> logger)
        : INotificationHandler<InterviewerAvailabilityCreated>
    {
        public async Task Handle(InterviewerAvailabilityCreated notification, CancellationToken cancellationToken)
        {
            logger.LogInformation("Handling InterviewerAvailabilityCreated domain event...");
            await Task.CompletedTask; // Replace with actual asynchronous work if needed
            logger.LogInformation("Finished handling InterviewerAvailabilityCreated domain event.");
        }
    }
}
