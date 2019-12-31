using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class ProductSizes
    {
        [ForeignKey("Products")]
        public int ProductId { get; set; }

        [ForeignKey("Sizes")]
        public int SizeId { get; set; }

        public virtual Products Products { get; set; }
        public virtual Sizes Sizes { get; set; }
    }
}
