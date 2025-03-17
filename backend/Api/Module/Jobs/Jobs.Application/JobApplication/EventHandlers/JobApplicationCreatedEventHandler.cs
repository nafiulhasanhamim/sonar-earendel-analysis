﻿using TalentMesh.Module.Job.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace TalentMesh.Module.Job.Application.JobApplication.EventHandlers;

public class JobApplicationCreatedEventHandler(ILogger<JobApplicationCreatedEventHandler> logger) : INotificationHandler<JobApplicationCreated>
{
    public async Task Handle(JobApplicationCreated notification,
        CancellationToken cancellationToken)
    {
        logger.LogInformation("handling User created domain event..");
        await Task.FromResult(notification);
        logger.LogInformation("finished handling User created domain event..");
    }
}
