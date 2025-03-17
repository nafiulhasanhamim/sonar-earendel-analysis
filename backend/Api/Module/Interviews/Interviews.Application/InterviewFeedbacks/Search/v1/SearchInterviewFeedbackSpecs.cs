﻿using Ardalis.Specification;
using TalentMesh.Framework.Core.Paging;
using TalentMesh.Framework.Core.Specifications;
using TalentMesh.Module.Interviews.Domain;
using TalentMesh.Module.Interviews.Application.InterviewFeedbacks.Get.v1;

namespace TalentMesh.Module.Interviews.Application.InterviewFeedbacks.Search.v1;

public class SearchInterviewFeedbackSpecs : EntitiesByPaginationFilterSpec<InterviewFeedback, InterviewFeedbackResponse>
{
    public SearchInterviewFeedbackSpecs(SearchInterviewFeedbacksCommand command)
        : base(command)
    {
        if (command.InterviewId.HasValue)
            Query.Where(c => c.InterviewId == command.InterviewId.Value);

        if (command.InterviewQuestionId.HasValue)
            Query.Where(c => c.InterviewQuestionId == command.InterviewQuestionId.Value);

        if (!string.IsNullOrEmpty(command.Response))
            Query.Where(c => c.Response.Contains(command.Response));

        if (command.Score.HasValue)
            Query.Where(c => c.Score >= command.Score.Value);

        // Default sorting by InterviewId (ascending) unless another order is specified
        Query.OrderBy(c => c.InterviewId, !command.HasOrderBy());
    }
}
