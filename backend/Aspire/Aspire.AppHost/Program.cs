var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.Server>("server")
.WithHttpEndpoint(port: 18888)
.WithHttpEndpoint(port: 8000);


builder.Build().Run();
