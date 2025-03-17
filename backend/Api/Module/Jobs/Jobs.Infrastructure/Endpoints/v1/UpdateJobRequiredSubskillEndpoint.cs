﻿using TalentMesh.Framework.Infrastructure.Auth.Policy;
using TalentMesh.Module.Job.Application.JobRequiredSubskill.Update.v1;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace TalentMesh.Module.Job.Infrastructure.Endpoints.v1
{
    public static class UpdateJobRequiredSubskillEndpoint
    {
        internal static RouteHandlerBuilder MapJobRequiredSubskillUpdateEndpoint(this IEndpointRouteBuilder endpoints)
        {
            return endpoints
                .MapPut("/{id:guid}", async (Guid id, UpdateJobRequiredSubskillCommand request, ISender mediator) =>
                {
                    if (id != request.Id)
                        return Results.BadRequest();

                    var response = await mediator.Send(request);
                    return Results.Ok(response);
                })
                .WithName(nameof(UpdateJobRequiredSubskillEndpoint))
                .WithSummary("Updates a Job Required Subskill")
                .WithDescription("Updates a Job Required Subskill association by its identifier")
                .Produces<UpdateJobRequiredSubskillResponse>()
                .RequirePermission("Permissions.JobRequiredSubskill.Update")
                .MapToApiVersion(1);
        }
    }
}
