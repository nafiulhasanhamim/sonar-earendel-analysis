﻿using System.Reflection;
using Asp.Versioning.Conventions;
using Carter;
using FluentValidation;
using TalentMesh.Module.Experties.Application;
using TalentMesh.Module.Job.Application;
using TalentMesh.Module.Job.Infrastructure;
using TalentMesh.Module.Experties.Infrastructure;


namespace TalentMesh.WebApi.Host;

public static class Extensions
{
    public static WebApplicationBuilder RegisterModules(this WebApplicationBuilder builder)
    {
        ArgumentNullException.ThrowIfNull(builder);

        //define module assemblies
        var assemblies = new Assembly[]
        {
            typeof(JobMetadata).Assembly,
            typeof(ExpertiesMetadata).Assembly,

        };

        //register validators
        builder.Services.AddValidatorsFromAssemblies(assemblies);

        //register mediatr
        builder.Services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblies(assemblies);
        });

        //register module services
        builder.RegisterJobServices();
        builder.RegisterExpertiesServices();

        //add carter endpoint modules
        builder.Services.AddCarter(configurator: config =>
        {
            config.WithModule<JobModule.Endpoints>();
            config.WithModule<ExpertiesModule.Endpoints>();

        });

        return builder;
    }

    public static WebApplication UseModules(this WebApplication app)
    {
        ArgumentNullException.ThrowIfNull(app);

        //register modules
        app.UseJobModule();
        app.UseExpertiesModule();

        //register api versions
        var versions = app.NewApiVersionSet()
                    .HasApiVersion(1)
                    .HasApiVersion(2)
                    .ReportApiVersions()
                    .Build();

        //map versioned endpoint
        var endpoints = app.MapGroup("api/v{version:apiVersion}").WithApiVersionSet(versions);

        //use carter
        endpoints.MapCarter();

        return app;
    }
}
