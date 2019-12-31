using ecommerce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.ViewModels
{
    public class OrderViewModel
    {
        public Orders orders { get; set; }
        public List<OrdersDetails> ordersdetails { get; set; }
    }
}
