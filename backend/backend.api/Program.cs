using CartAPI;
// using CartAPI.RabbitMQ;
using CartAPI.Services;
using CartAPI.Services.Caching;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Prometheus;
using Serilog;
using Serilog.Sinks.Elasticsearch;


var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;

builder.Services.AddScoped<ICartService, CartService>();

//for redis
builder.Services.AddScoped<IRedisCacheService, RedisCacheService>();


//add automapper service
builder.Services.AddAutoMapper(typeof(Program));

//database connection
builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


//for redis
var redisHost = builder.Configuration["Redis:Host"];
var redisPort = builder.Configuration["Redis:Port"];
var redisConnection = $"{redisHost}:{redisPort}";

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = redisConnection;
    options.InstanceName = "cart";
});

//RabbitMQ
// builder.Services.AddSingleton<IRabbmitMQCartMessageSender, RabbmitMQCartMessageSender>();
// builder.Services.AddHostedService<RabbitMQConsumer>();

//Add Config for Required Email
builder.Services.Configure<IdentityOptions>(
    opts => opts.SignIn.RequireConfirmedEmail = true
    );

builder.Services.Configure<DataProtectionTokenProviderOptions>(opts => opts.TokenLifespan = TimeSpan.FromHours(10));
// Adding Authentication
// builder.Services.AddAuthentication(options =>
// {
//     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//     options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
// }).AddJwtBearer(options =>
// {
//     options.SaveToken = true;
//     options.RequireHttpsMetadata = false;
//     options.TokenValidationParameters = new TokenValidationParameters()
//     {
//         ValidateIssuer = true,
//         ValidateAudience = true,
//         ValidAudience = configuration["JWT:ValidAudience"],
//         ValidIssuer = configuration["JWT:ValidIssuer"],
//         IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
//     };
// });




// Load Serilog configuration from appsettings.json
// SerilogConfig.ConfigureLogging(builder.Configuration);
// builder.Host.UseSerilog();
builder.Host.UseSerilog((context, config) =>
{
    config
        .WriteTo.Console()
        .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("http://elasticsearch:9200"))
        {
            AutoRegisterTemplate = true,
            IndexFormat = "app-logs-{0:yyyy.MM.dd}"
        })
        .WriteTo.Http("http://logstash:5044", queueLimitBytes: 1000000); // Specify queueLimitBytes
});


//add controller services
builder.Services.AddControllers();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.InvalidModelStateResponseFactory = context =>
    {
        var errors = context.ModelState
                .Where(e => e.Value!.Errors.Count > 0)
                .Select(e => new
                {
                    Field = e.Key,
                    Errors = e.Value!.Errors.Select(x => x.ErrorMessage).ToArray()

                }).ToList();

        var errorString = string.Join("; ", errors.Select(e => $"{e.Field} : {string.Join(", ", e.Errors)}"));

        return new BadRequestObjectResult(new
        {
            Message = "Validation failed",
            Errors = errors
        });
    };
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

var app = builder.Build();

// ✅ **Apply Migrations Automatically for docker**
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        context.Database.Migrate(); // Apply pending migrations
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Migration failed: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//custom response for 401 unauthorized or 403 Forbidden

app.UseHttpsRedirection();
app.UseAuthentication();

// Enable Prometheus metrics
app.UseMetricServer();
app.UseSerilogRequestLogging(); // Enable logging of HTTP requests
app.UseHttpMetrics();
app.UseAuthorization();
app.MapControllers();
app.Run();