﻿using Finbuckle.MultiTenant;
using TalentMesh.Framework.Core.Audit;
using TalentMesh.Framework.Infrastructure.Identity.RoleClaims;
using TalentMesh.Framework.Infrastructure.Identity.Roles;
using TalentMesh.Framework.Infrastructure.Identity.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IdentityConstants = TalentMesh.Shared.Authorization.IdentityConstants;

namespace TalentMesh.Framework.Infrastructure.Identity.Persistence;

public class AuditTrailConfig : IEntityTypeConfiguration<AuditTrail>
{
    public void Configure(EntityTypeBuilder<AuditTrail> builder)
    {
        builder
            .ToTable("AuditTrails", IdentityConstants.SchemaName)
            .IsMultiTenant();

        builder.HasKey(a => a.Id);
    }
}

public class ApplicationUserConfig : IEntityTypeConfiguration<TMUser>
{
    public void Configure(EntityTypeBuilder<TMUser> builder)
    {
        builder
            .ToTable("Users", IdentityConstants.SchemaName)
            .IsMultiTenant();

        builder
            .Property(u => u.ObjectId)
                .HasMaxLength(256);
    }
}

public class ApplicationRoleConfig : IEntityTypeConfiguration<TMRole>
{
    public void Configure(EntityTypeBuilder<TMRole> builder) =>
        builder
            .ToTable("Roles", IdentityConstants.SchemaName)
            .IsMultiTenant()
                .AdjustUniqueIndexes();
}

public class ApplicationRoleClaimConfig : IEntityTypeConfiguration<TMRoleClaim>
{
    public void Configure(EntityTypeBuilder<TMRoleClaim> builder) =>
        builder
            .ToTable("RoleClaims", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserRoleConfig : IEntityTypeConfiguration<IdentityUserRole<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder) =>
        builder
            .ToTable("UserRoles", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserClaimConfig : IEntityTypeConfiguration<IdentityUserClaim<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserClaim<string>> builder) =>
        builder
            .ToTable("UserClaims", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserLoginConfig : IEntityTypeConfiguration<IdentityUserLogin<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserLogin<string>> builder) =>
        builder
            .ToTable("UserLogins", IdentityConstants.SchemaName)
            .IsMultiTenant();
}

public class IdentityUserTokenConfig : IEntityTypeConfiguration<IdentityUserToken<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserToken<string>> builder) =>
        builder
            .ToTable("UserTokens", IdentityConstants.SchemaName)
            .IsMultiTenant();
}
