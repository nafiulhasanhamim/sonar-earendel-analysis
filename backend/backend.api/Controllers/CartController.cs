using CartAPI.DTOs;
using CartAPI.Extensions;
using CartAPI.Services;
using CartAPI.Services.Caching;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Controllers;
using Serilog;

namespace CartAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IRedisCacheService _cache;

        private readonly ILogger<CartController> _logger;

        public CartController(ICartService cartService, IRedisCacheService cache, ILogger<CartController> logger)
        {
            _cartService = cartService;
            _cache = cache;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto dto)
        {
            // var userId = User.GetUserId();
            var result = await _cartService.AddToCart(dto, "123456");
            _cache.RemoveData("carts");
            return ApiResponse.Success(result);
        }

        [HttpGet]
        // public async Task<IActionResult> GetUserCart()
        // {
        //     // var userId = User.GetUserId();
        //     var carts = await _cache.GetDataAsync<List<CartDto>>("carts");
        //     Console.WriteLine("carts..............................................");
        //     if (carts is not null)
        //     {
        //         Console.WriteLine("cart items found");
        //         return ApiResponse.Success(carts);
        //     }
        //     var result = await _cartService.GetUserCart("123456");
        //     _cache.SetData("carts", new List<CartDto> { result });
        //     return ApiResponse.Success(result);
        // }


        public async Task<IActionResult> GetUserCart()
        {
            Log.Information("GetUserCart() called");

            var cachedCart = await _cache.GetDataAsync<CartDto>("carts");

            if (cachedCart is not null)
            {
                Log.Information("Cart found in cache for user: {UserId}", "123456");
                return ApiResponse.Success(new { result = cachedCart });
            }

            try
            {
                var result = await _cartService.GetUserCart("123456");

                if (result == null)
                {
                    Log.Warning("No cart data found for user: {UserId}", "123456");
                    return ApiResponse.BadRequest("Cart not found");
                }

                _cache.SetData("carts", result);
                Log.Information("Cart fetched from database and cached for user: {UserId}", "123456");

                return ApiResponse.Success(new { result = result });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Error fetching cart for user: {UserId}", "123456");
                return ApiResponse.BadRequest("An error occurred while fetching the cart");
            }
        }


    }
}
