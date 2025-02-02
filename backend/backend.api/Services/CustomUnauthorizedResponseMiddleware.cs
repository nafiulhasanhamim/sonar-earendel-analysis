using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Serilog;

namespace dotnet_mvc.Services
{
    public class CustomUnauthorizedResponseMiddleware
    {
        private readonly RequestDelegate _next;

        public CustomUnauthorizedResponseMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);

                if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
                {
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new
                    {
                        Error = "Unauthorized",
                        Message = "You are not authorized to access this resource. Please log in with appropriate credentials."
                    }));
                    Log.Error("You are not authorized to access this resource. Please log in with appropriate credentials.");

                }
                else if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
                {
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new
                    {
                        Error = "Forbidden",
                        Message = "You do not have permission to perform this action. Contact your administrator if you believe this is a mistake."
                    }));
                    Log.Error("You do not have permission to perform this action. Contact your administrator if you believe this is a mistake.");
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Unhandled Exception: {Message}", ex.Message);
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync("An unexpected error occurred.");
            }
        }
    }

}