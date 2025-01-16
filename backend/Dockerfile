# Stage 1: Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

# Copy the project file and restore dependencies
COPY backend.csproj ./
RUN dotnet restore

# Copy all source files except excluded ones from .dockerignore
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App

# Copy the built application from the build stage
COPY --from=build-env /App/out .

# Expose the default port
EXPOSE 80

# Define the entry point
ENTRYPOINT ["dotnet", "backend.dll"]
