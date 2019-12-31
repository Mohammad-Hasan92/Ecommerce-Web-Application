using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        [DisplayName("Order Date")]
        public DateTime OrderDate { get; set; } = DateTime.Now;
        [ForeignKey("Customers")]
        public int CustomerId { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Grand Total")]
        [Required]
        public decimal GrandTotal { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Discount")]

        public decimal Discount { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Net Price")]
        [Required]
        public decimal NetPrice { get; set; }
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual Customers Customers { get; set; }
        public virtual ICollection<OrdersDetails> OrdersDetails { get; set; }
    }
}
