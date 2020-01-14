using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class ProductGroup
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int GroupId { get; set; }

        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Group Name")]
        [Required]
        public string GroupName { get; set; }

        public virtual ICollection<Products> Products { get; set; }



    }
}
