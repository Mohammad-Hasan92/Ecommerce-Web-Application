using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class SubCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SubCatId { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Sub Category Name")]
        [Required]
        public string SubCategoryName { get; set; }

        [ScaffoldColumn(false)]
        [DataType(DataType.ImageUrl)]
        public string Image { get; set; }
        [NotMapped]
        public IFormFile Upload { get; set; }

        public Guid UniqueId { get; set; } = Guid.NewGuid();

        [ForeignKey("Category")]
        public int CatId { get; set; }
        public virtual Category Category { get; set; }
         public virtual ICollection<Products> Products { get; set; }
    }
}
