﻿using FluentValidation;

namespace TalentMesh.Module.Job.Application.JobRequiredSkill.Update.v1
{
    public class UpdateJobRequiredSkillCommandValidator : AbstractValidator<UpdateJobRequiredSkillCommand>
    {
        public UpdateJobRequiredSkillCommandValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Id is required.");
            RuleFor(x => x.JobId)
                .NotEmpty().WithMessage("Job Id is required.");
            RuleFor(x => x.SkillId)
                .NotEmpty().WithMessage("Skill Id is required.");
        }
    }
}
