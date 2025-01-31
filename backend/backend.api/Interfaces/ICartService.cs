
using CartAPI.DTOs;

namespace CartAPI.Services
{
    public interface ICartService
    {
        Task<CartItemDto> AddToCart(AddToCartDto addToCartDto, string userId);
        Task<CartDto> GetUserCart(string userId);
    }
}
