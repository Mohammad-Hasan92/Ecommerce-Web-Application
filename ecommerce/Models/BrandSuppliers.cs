using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class BrandSuppliers
    {
        [ForeignKey("Suppliers")]
        public int SupplierId { get; set; }

        [ForeignKey("Brand")]
        public int BrandId { get; set; }

        public virtual Brand Brand { get; set; }
        public virtual Suppliers Suppliers { get; set; }
    }
}
