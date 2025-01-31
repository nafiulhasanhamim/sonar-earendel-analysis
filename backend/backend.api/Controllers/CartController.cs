using CartAPI.DTOs;
using CartAPI.Extensions;
using CartAPI.Services;
using CartAPI.Services.Caching;
using Microsoft.AspNetCore.Mvc;
using ProductAPI.Controllers;

namespace CartAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        private readonly IRedisCacheService _cache;


        public CartController(ICartService cartService, IRedisCacheService cache)
        {
            _cartService = cartService;
            _cache = cache;
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
            var cachedCart = await _cache.GetDataAsync<CartDto>("carts"); // Fetch as single CartDto, not List<CartDto>

            if (cachedCart is not null)
            {
                Console.WriteLine("Cart found in cache");
                return ApiResponse.Success(new { result = cachedCart }); // Wrap in "result"
            }

            var result = await _cartService.GetUserCart("123456");

            // Save in Redis as a single object
            _cache.SetData("carts", result);

            return ApiResponse.Success(new { result = result }); // Ensure consistent structure
        }


    }
}
