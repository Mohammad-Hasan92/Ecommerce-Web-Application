using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Sizes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SizeId { get; set; }
        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Size Value")]
        [Required]
        public string SizeValue { get; set; }
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual ICollection<Stocks> Stocks { get; set; }
        public virtual ICollection<ProductSizes> ProductSizes { get; set; }
    }
}
