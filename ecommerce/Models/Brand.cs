using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Brand
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BrandId { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Brand Name")]
        [Required]
        public string BrandName { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime RecordDate { get; set; } = DateTime.Now;
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual ICollection<BrandSuppliers> BrandSuppliers { get; set; }
        public virtual ICollection<Products> Products { get; set; }
    }
}
