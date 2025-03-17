﻿using TalentMesh.Framework.Core.Persistence;
using TalentMesh.Module.Interviews.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TalentMesh.Module.Interviews.Infrastructure.Persistence;

namespace TalentMesh.Module.Interviews.Infrastructure.Persistence
{
    internal sealed class InterviewsDbInitializer(
        ILogger<InterviewsDbInitializer> logger,
        InterviewsDbContext context) : IDbInitializer
    {
        public async Task MigrateAsync(CancellationToken cancellationToken)
        {
            // Apply any pending migrations
            if ((await context.Database.GetPendingMigrationsAsync(cancellationToken)).Any())
            {
                await context.Database.MigrateAsync(cancellationToken).ConfigureAwait(false);
                logger.LogInformation("[{Tenant}] applied database migrations for Interviews module", context.TenantInfo!.Identifier);
            }
        }

        public async Task SeedAsync(CancellationToken cancellationToken)
        {
            var applicationId = Guid.NewGuid();  // Generate a new Application ID for seeding
            var interviewerId = Guid.NewGuid();  // Generate a new Interviewer ID for seeding
            var interviewDate = DateTime.UtcNow.AddDays(1); // Future interview date
            const string status = "Scheduled"; // Default status for seeding
            const string notes = "Initial interview setup"; // Notes for seeding
            var meetingId = Guid.NewGuid().ToString(); // Generate a unique Meeting ID

            // Check if an Interview already exists with the same ApplicationId
            if (await context.Interviews.FirstOrDefaultAsync(t => t.ApplicationId == applicationId, cancellationToken).ConfigureAwait(false) is null)
            {
                // Create a new Interview for seeding
                var interview = Interview.Create(applicationId, interviewerId, interviewDate, status, notes, meetingId);

                // Add the Interview to the database
                await context.Interviews.AddAsync(interview, cancellationToken);
                await context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);

                // Log the seeding process
                logger.LogInformation("[{Tenant}] seeding default Interview data", context.TenantInfo!.Identifier);
            }
        }
    }
}
