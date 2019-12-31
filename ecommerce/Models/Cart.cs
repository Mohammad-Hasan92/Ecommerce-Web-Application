using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Cart
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CartId { get; set; }

        [ForeignKey("Products")]
        public int ProductId { get; set; }

        [DisplayName("Quantity")]
        [Required]
        public double Quantity { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Price")]
        [Required]
        public decimal SubTotal { get; set; }

         public virtual Products Products { get; set; }
    }
}
