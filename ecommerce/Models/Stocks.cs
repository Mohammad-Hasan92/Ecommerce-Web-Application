using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Stocks
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int StockId { get; set; }

        [ForeignKey("Products")]
        public int ProductId { get; set; }

        [ForeignKey("Sizes")]
        public int SizeId { get; set; }
        [DisplayName("Quantity")]
        [Required]
        public double Quantity { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime StockDate { get; set; } = DateTime.Now;
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual Products Products { get; set; }
        public virtual Sizes Sizes { get; set; }



        
    }
}
