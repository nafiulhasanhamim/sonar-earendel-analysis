using AutoMapper;
using CartAPI.DTOs;
using CartAPI.Interfaces;
using CartAPI.Models;
using CartAPI.RabbitMQ;
using Microsoft.EntityFrameworkCore;

namespace CartAPI.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        private readonly IRabbmitMQCartMessageSender _messageBus;


        public CartService(AppDbContext context, IMapper mapper, IRabbmitMQCartMessageSender messageBus)
        {
            _context = context;
            _mapper = mapper;
            _messageBus = messageBus;
        }

        public async Task<CartItemDto> AddToCart(AddToCartDto addToCartDto, string userId)
        {
            // var product = await _productService.GetProduct(addToCartDto.ProductId);
            var existingItem = await _context.Carts
                .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == addToCartDto.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += 1;
                existingItem.Price = 200 - 10;
                existingItem.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return _mapper.Map<CartItemDto>(existingItem);
            }

            var cartItem = _mapper.Map<CartItem>(addToCartDto);
            cartItem.AddedAt = DateTime.UtcNow;
            cartItem.UserId = userId;
            cartItem.Price = 200 - 10;
            cartItem.UpdatedAt = DateTime.UtcNow;
            cartItem.CartId = Guid.NewGuid().ToString();

            await _context.Carts.AddAsync(cartItem);
            await _context.SaveChangesAsync();
            _messageBus.SendMessage(new
            {
                CartId = cartItem.CartId,
                ProductId = addToCartDto.ProductId,
            }, "CartExchange", "exchange");
            return _mapper.Map<CartItemDto>(cartItem);
        }

        public async Task<CartDto> GetUserCart(string userId)
        {
            var cartItems = await _context.Carts.Where(c => c.UserId == userId).ToListAsync();
            return _mapper.Map<CartDto>(cartItems);
        }
    }
}
