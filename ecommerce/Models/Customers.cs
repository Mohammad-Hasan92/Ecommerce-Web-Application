using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Customers
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerId { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Customer Name")]
        [Required]
        public string CustomerName { get; set; }

        [EmailAddress]
        [DisplayName("Customer Email")]
        [Required]
        public string Email { get; set; }

        [DataType(DataType.MultilineText)]
        [DisplayName("Customer Address")]
        public string Address { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(15)]
        [DisplayName("Contact Number")]
        [Required]
        public string ContactNumber { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime RecordDate { get; set; } = DateTime.Now;
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public virtual ICollection<Orders> Orders { get; set; }
         public virtual ICollection<Comments> Comments { get; set; }
         public virtual ICollection<WishList> WishList { get; set; }
         public virtual ICollection<Refund> Refund { get; set; }
    }
}
