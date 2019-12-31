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
    public class Products
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Product Name")]
        [Required]
        public string ProductName { get; set; }

        [ScaffoldColumn(false)]
        [DataType(DataType.ImageUrl)]
        public string Image { get; set; }
        [NotMapped]
        public IFormFile Upload { get; set; }

        [ForeignKey("SubCategory")]
        public int SubCatId { get; set; }

        [ForeignKey("Brand")]
        public int BrandId { get; set; }

        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual SubCategory SubCategory { get; set; }
        public virtual Brand Brand { get; set; }

        public virtual ICollection<Stocks> Stocks { get; set; }
        public virtual ICollection<ProductSizes> ProductSizes { get; set; }
        public virtual ICollection<PurchaseDetails> PurchaseDetails { get; set; }
         public virtual ICollection<Comments> Comments { get; set; }
        public virtual ICollection<WishList> WishList { get; set; }
        public virtual ICollection<OrdersDetails> OrdersDetails { get; set; }
        public virtual ICollection<Cart> Cart { get; set; }
    }
}
