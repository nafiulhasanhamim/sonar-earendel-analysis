﻿using Ardalis.Specification;
using TalentMesh.Framework.Core.Paging;
using TalentMesh.Framework.Core.Specifications;
using TalentMesh.Module.Experties.Application.SubSkills.Get.v1;
using TalentMesh.Module.Experties.Domain;

namespace TalentMesh.Module.Experties.Application.SubSkills.Search.v1;
public class SearchSubSkillSpecs : EntitiesByPaginationFilterSpec<Experties.Domain.SubSkill, SubSkillResponse>
{
    public SearchSubSkillSpecs(SearchSubSkillsCommand command)
        : base(command) =>
        Query
            .OrderBy(c => c.Name, !command.HasOrderBy())
            .Where(b => b.Name.Contains(command.Keyword), !string.IsNullOrEmpty(command.Keyword));
}
