﻿using TalentMesh.Module.Experties.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace TalentMesh.Module.Experties.Infrastructure.Persistence.Configurations;
internal sealed class RubricConfiguration : IEntityTypeConfiguration<Experties.Domain.Rubric>
{
    public void Configure(EntityTypeBuilder<Experties.Domain.Rubric> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Title).HasMaxLength(100);
        builder.Property(x => x.RubricDescription).HasMaxLength(1000);
    }
}