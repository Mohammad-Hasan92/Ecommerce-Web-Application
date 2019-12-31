using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class PurchaseDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PurchaseDetailId { get; set; }
        [ForeignKey("Purchase")]
        public int PurchaseId { get; set; }
        [ForeignKey("Products")]
        public int ProductId { get; set; }
        [DisplayName("Quantity")]
        [Required]
        public double Quantity { get; set; }
        [DataType(DataType.Currency)]
        [DisplayName("Unit Price")]
        [Required]
        public decimal unitPrice { get; set; }
        [DataType(DataType.Currency)]
        [DisplayName("Total Price")]
        [Required]

        public decimal TotalPrice => (decimal)Quantity * unitPrice;

        public Guid UniqueId { get; set; } = Guid.NewGuid();
         public virtual Purchase Purchase { get; set; }
         public virtual Products Products { get; set; }

    }
}
