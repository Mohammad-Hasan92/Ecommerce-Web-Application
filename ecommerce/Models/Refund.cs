using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Refund
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RefundId { get; set; }

        [ForeignKey("Customers")]
        public int CustomerId { get; set; }

        //[ForeignKey("OrdersDetails")]
        public int OrderDetailsId { get; set; }


        [DisplayName("Quantity")]
        [Required]
        public double Quantity { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Price")]
        [Required]
        public decimal Price { get; set; }
        
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual Customers Customers { get; set; }
        public virtual OrdersDetails OrdersDetails { get; set; }
      
    }
}
