using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce.Data;
using ecommerce.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public CartController(EcommerceContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<CartVM>> GetCart()
        {
            CartVM cart = new CartVM();
            try
            {
                cart = this.HttpContext.Session.Get<CartVM>("cart");
                if (cart == null)
                {
                    cart = new CartVM();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }
            return cart;
        }
       
        [HttpPost]
        public async Task<ActionResult<CartVM>> AddToCart(CartItem cartItem)
        {
            CartVM cart = new CartVM();
            try
            {
                cart = this.HttpContext.Session.Get<CartVM>("cart");
                if (cart?.CartItems == null)
                {
                    cart = new CartVM();
                    cart.CartItems.Add(cartItem);
                }
                else
                {
                    if (cart.CartItems.Any(c => c.ProductId == cartItem.ProductId))
                    {
                        int idx = cart.CartItems.FindIndex(0, c => c.ProductId == cartItem.ProductId);

                        cart.CartItems[idx].Qty += 1;
                    }
                    else
                    {
                        cart.CartItems.Add(cartItem);
                    }
                }


                this.HttpContext.Session.Set<CartVM>("cart", cart);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return cart;
        }
        [HttpPost("RemoveFromCart")]
        public async Task<ActionResult<CartVM>> RemoveFromCart(CartItem cartItem)
        {
            CartVM cart = new CartVM();
            try
            {
                cart = this.HttpContext.Session.Get<CartVM>("cart");
                if (cart?.CartItems == null)
                {
                    cart = new CartVM();
                }
                else
                {
                    if (cart.CartItems.Any(c => c.ProductId == cartItem.ProductId))
                    {
                        int idx = cart.CartItems.FindIndex(0, c => c.ProductId == cartItem.ProductId);

                        cart.CartItems[idx].Qty -= 1;
                        if (cart.CartItems[idx].Qty == 0)
                        {
                            cart.CartItems.RemoveAt(idx);
                        }
                    }
                    else
                    {
                        //cart.CartItems.Add(cartItem);
                    }
                }


                this.HttpContext.Session.Set<CartVM>("cart", cart);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return cart;
        }
        [HttpGet("ClearCart")]
        public async Task<ActionResult<CartVM>> ClearCart()
        {

            CartVM cart = new CartVM();

            try
            {
                this.HttpContext.Session.Remove("cart");
                this.HttpContext.Session.Set<CartVM>("cart", cart);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            }

            return cart;
        }

    }
}