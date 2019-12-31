using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class OrdersDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderDetailsId { get; set; }

        [ForeignKey("Orders")]
        public int OrdersId { get; set; }

        [ForeignKey("Products")]
        public int ProductId { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Unit Price")]
        [Required]
        public decimal UnitPrice { get; set; }

        [DisplayName("Quantity")]
        [Required]
        public int Quantity { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Total Price")]
        [Required]
        public decimal TotalPrice { get; set; }
        public Guid UniqueId { get; set; } = Guid.NewGuid();
        public virtual Orders Orders { get; set; }
        public virtual Products Products { get; set; }

        public virtual ICollection<Refund> Refund { get; set; }
    }
}
