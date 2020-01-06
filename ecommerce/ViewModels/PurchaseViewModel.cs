using ecommerce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.ViewModels
{
    public class PurchaseViewModel
    {

        public Purchase purchase { get; set; }
        public List<PurchaseDetails> purchasedetails { get; set; }
    }
}
