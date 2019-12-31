using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Purchase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PurchaseId { get; set; }


        public decimal PurchasePrice { get; set; }
       

        public DateTime PurchaseDate { get; set; } = DateTime.Now;
        public Guid UniqueId { get; set; } = Guid.NewGuid();

         public virtual ICollection<PurchaseDetails> PurchaseDetails { get; set; }
    }
}
