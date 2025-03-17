using TalentMesh.Framework.Infrastructure.Auth.Policy;
using TalentMesh.Module.Experties.Application.Seniorities.Update.v1;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace TalentMesh.Module.Experties.Infrastructure.Endpoints.v1;
public static class UpdateSeniorityEndpoint
{
    internal static RouteHandlerBuilder MapSeniorityUpdateEndpoint(this IEndpointRouteBuilder endpoints)
    {
        return endpoints
            .MapPut("/{id:guid}", async (Guid id, UpdateSeniorityCommand request, ISender mediator) =>
            {
                if (id != request.Id) return Results.BadRequest();
                var response = await mediator.Send(request);
                return Results.Ok(response);
            })
            .WithName(nameof(UpdateSeniorityEndpoint))
            .WithSummary("update a seniority")
            .WithDescription("update a seniority")
            .Produces<UpdateSeniorityResponse>()
            // .RequirePermission("Permissions.Products.Update")
            .MapToApiVersion(1);
    }
}
