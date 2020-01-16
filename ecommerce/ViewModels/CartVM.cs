using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.ViewModels
{
    public class CartVM
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public int TotalItemType  => CartItems.Count;
        public int TotalItems  => CartItems.Select(i=>i.Qty).Sum();
        public decimal Total  => CartItems.Select(s => s.Amount).Sum();
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
    }

    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string SizeValue { get; set; }
        public int Qty { get; set; }
        public decimal Price { get; set; }
        public decimal Amount  => Qty * Price;

    }
}
