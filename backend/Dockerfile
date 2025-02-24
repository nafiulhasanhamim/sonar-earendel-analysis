# ================================
# Stage 1: Build & Restore Dependencies
# ================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory inside the container
WORKDIR /app

# Copy the solution file
COPY Aspire/Aspire.sln ./

# Copy all project files while maintaining folder structure
COPY Api/Server/ Api/Server/
COPY Aspire/ Aspire/
COPY Api/Framework/Core/ Api/Framework/Core/
COPY Api/Framework/Infrastructure/ Api/Framework/Infrastructure/
COPY Api/Migrations/PGSql/ Api/Migrations/PGSql/
COPY Api/Module/Experties/ Api/Module/Experties/
COPY Api/Module/Jobs/ Api/Module/Jobs/
COPY Shared/ Shared/
COPY TalentMesh.test/ TalentMesh.test/

# ✅ Ensure the `assets` directory is copied safely
RUN mkdir -p /app/assets
COPY Api/Server/assets/ /app/assets/
RUN chmod -R 755 /app/assets  # Set correct permissions

# Restore dependencies (cached for performance)
RUN dotnet restore Aspire/Aspire.sln

# ================================
# Stage 2: Build & Publish Application
# ================================
FROM build AS publish

# Copy the full source code
COPY . .

# Build the application in Release mode
RUN dotnet build Aspire/Aspire.sln -c Release --no-restore

# Publish the application
RUN dotnet publish Aspire/Aspire.sln -c Release -o /app/publish --no-build

# ================================
# Stage 3: Runtime (Final Image)
# ================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set working directory inside the container
WORKDIR /app

# Copy the published files from the build stage
COPY --from=publish /app/publish .

# Ensure `assets` directory exists in final container
RUN mkdir -p /app/assets && chmod -R 755 /app/assets

# Expose the application ports
EXPOSE 17078
EXPOSE 15233
EXPOSE 8000
EXPOSE 8001

# Set the entrypoint command
ENTRYPOINT ["dotnet", "Server.dll"]
