# Stage 1: Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App

# Copy project file and restore dependencies
COPY backend.csproj ./
RUN dotnet restore

# Copy source and config files
COPY backend/ ./backend
COPY appsettings.json ./appsettings.json
COPY appsettings.Development.json ./appsettings.Development.json
COPY Program.cs ./Program.cs

# Build the project
RUN dotnet publish -c Release -o out

# Stage 2: Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App

# Create a non-root user and set permissions
RUN adduser --disabled-password --gecos "" appuser \
    && chown -R appuser:appuser /App

# Switch to the non-root user
USER appuser

# Copy the built application from the build stage
COPY --from=build-env /App/out .

# Expose the application port
EXPOSE 80

# Set the entry point
ENTRYPOINT ["dotnet", "backend.dll"]
