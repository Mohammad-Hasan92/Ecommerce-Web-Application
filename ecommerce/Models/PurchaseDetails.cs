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
       
        public int PurchaseId { get; set; }
     
        public int ProductId { get; set; }
        [DisplayName("Quantity")]
        [Required]
        public double Quantity { get; set; }
        [DataType(DataType.Currency)]
        [DisplayName("Unit Price")]
        [Required]
        public decimal unitPrice { get; set; }

        [DisplayName("Size")]
        [Required]
        public int SizeId { get; set; }



        [DataType(DataType.Currency)]
        [DisplayName("Total Price")]
        [Required]

        public decimal TotalPrice => (decimal)Quantity * unitPrice;

        public Guid UniqueId { get; set; } = Guid.NewGuid();


        [ForeignKey("PurchaseId")]
        public virtual Purchase Purchase { get; set; }


        [ForeignKey("ProductId")]
        public virtual Products Products { get; set; }


        [ForeignKey("SizeId")]
        public virtual Products Sizes { get; set; }

    }
}
