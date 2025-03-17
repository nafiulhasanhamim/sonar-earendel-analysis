﻿using MediatR;
using Microsoft.Extensions.Logging;
using TalentMesh.Module.Evaluator.Domain.Events;

namespace Evaluator.Application.Interviewer.EventHandlers.v1
{
    public class InterviewerEntryFormCreatedEventHandler(ILogger<InterviewerEntryFormCreatedEventHandler> logger)
        : INotificationHandler<InterviewerEntryFormCreated>
    {
        public async Task Handle(InterviewerEntryFormCreated notification, CancellationToken cancellationToken)
        {
            logger.LogInformation("Handling InterviewerEntryFormCreated domain event...");
            await Task.CompletedTask; // Replace with actual asynchronous work if needed
            logger.LogInformation("Finished handling InterviewerEntryFormCreated domain event.");
        }
    }
}
