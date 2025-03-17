﻿using TalentMesh.Framework.Core.Persistence;
using TalentMesh.Module.Job.Domain;
using TalentMesh.Module.Job.Domain.Exceptions;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TalentMesh.Module.Job.Domain.Extentsion;

namespace TalentMesh.Module.Job.Application.JobApplication.Delete.v1;
public sealed class DeleteJobApplicationHandler(
    ILogger<DeleteJobApplicationHandler> logger,
    [FromKeyedServices("jobs:jobapplication")] IRepository<Domain.JobApplication> repository)
    : IRequestHandler<DeleteJobApplicationCommand>
{
    public async Task Handle(DeleteJobApplicationCommand request, CancellationToken cancellationToken)
    {
        ArgumentNullException.ThrowIfNull(request);
        var jobApplication = await repository.GetByIdAsync(request.Id, cancellationToken);
        if (jobApplication.IsDeletedOrNotFound()) throw new JobNotFoundException(request.Id);
        await repository.DeleteAsync(jobApplication, cancellationToken);
        logger.LogInformation("JobApplication with id : {Id} deleted", jobApplication.Id);
    }
}
