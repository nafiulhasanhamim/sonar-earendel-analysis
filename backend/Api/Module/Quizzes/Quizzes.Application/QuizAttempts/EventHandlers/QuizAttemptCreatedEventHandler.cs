﻿using TalentMesh.Module.Quizzes.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace TalentMesh.Module.Quizzes.Application.QuizAttempts.EventHandlers;

public class QuizAttemptCreatedEventHandler(ILogger<QuizAttemptCreatedEventHandler> logger) : INotificationHandler<QuizAttemptCreated>
{
    public async Task Handle(QuizAttemptCreated notification,
        CancellationToken cancellationToken)
    {
        logger.LogInformation("handling quizAttempt created domain event..");
        await Task.FromResult(notification);
        logger.LogInformation("finished handling quizAttempt created domain event..");
    }
}
