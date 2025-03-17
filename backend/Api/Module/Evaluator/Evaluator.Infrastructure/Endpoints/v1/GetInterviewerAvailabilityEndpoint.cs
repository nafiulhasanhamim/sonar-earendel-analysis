﻿using TalentMesh.Framework.Infrastructure.Auth.Policy;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Evaluator.Application.Interviewer.Get.v1;

namespace TalentMesh.Module.Evaluator.Infrastructure.Endpoints.v1
{
    public static class GetInterviewerAvailabilityEndpoint
    {
        internal static RouteHandlerBuilder MapGetInterviewerAvailabilityEndpoint(this IEndpointRouteBuilder endpoints)
        {
            return endpoints
                .MapGet("/{id:guid}", async (Guid id, ISender mediator) =>
                {
                    var response = await mediator.Send(new GetInterviewerAvailabilityRequest(id));
                    return Results.Ok(response);
                })
                .WithName(nameof(GetInterviewerAvailabilityEndpoint))
                .WithSummary("Gets Interviewer Availability by id")
                .WithDescription("Retrieves an Interviewer Availability record by its identifier")
                .Produces<InterviewerAvailabilityResponse>()
                .RequirePermission("Permissions.Interviewer.View")
                .MapToApiVersion(1);
        }
    }
}
