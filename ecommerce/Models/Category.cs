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
    public class Category
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CatId { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Category Name")]
        [Required]
        public string CategoryName { get; set; }

        [ScaffoldColumn(false)]
        [DataType(DataType.ImageUrl)]
        public string Image { get; set; }
        [NotMapped]
        public IFormFile Upload { get; set; }
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual ICollection<SubCategory> SubCategory { get; set; }
    }
}
