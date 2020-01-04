using ecommerce.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.ViewModels
{
    public class ProductSizesViewModel
    {
        
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int SubCatId { get; set; }
        public int BrandId { get; set; }

        public int[] Sizes { get; set; }
        public string SizesValue { get; set; }


        public ProductSizesViewModel()
        {

        }

        public ProductSizesViewModel(Products products, int[] sizes, string[] sizesValue)
        {
            this.ProductId = products.ProductId;
            this.ProductName = products.ProductName;
            this.SubCatId = products.SubCatId;
            this.BrandId = products.BrandId;
            this.Sizes = sizes;
            this.SizesValue = string.Join(", ", SizesValue);

        }
    }
}
