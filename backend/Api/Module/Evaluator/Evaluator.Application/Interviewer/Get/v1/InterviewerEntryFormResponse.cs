﻿using System;

namespace Evaluator.Application.Interviewer.Get.v1
{
    public sealed record InterviewerEntryFormResponse(
        Guid? Id,
        Guid UserId,
        string? AdditionalInfo,
        string Status
    );
}
