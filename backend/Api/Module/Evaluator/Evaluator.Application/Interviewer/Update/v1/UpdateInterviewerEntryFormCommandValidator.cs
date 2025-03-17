﻿using FluentValidation;
using TalentMesh.Module.Evaluator.Application.Interviewer.Update.v1;

namespace TalentMesh.Module.Evaluator.Application.Interviewer.Update.v1
{
    public class UpdateInterviewerEntryFormCommandValidator : AbstractValidator<UpdateInterviewerEntryFormCommand>
    {
        public UpdateInterviewerEntryFormCommandValidator()
        {
            RuleFor(x => x.Status)
                .NotEmpty()
                .MinimumLength(2)
                .MaximumLength(50);
            RuleFor(x => x.AdditionalInfo)
                .MaximumLength(2000);
        }
    }
}
