using ecommerce.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.ViewModels
{
    public class BrandSuppliersViewModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [DisplayName("Supplier Id")]
        public int SupplierId { get; set; }
        [DataType(DataType.Text)]
        [MaxLength(50)]
        [DisplayName("Supplier Name")]
        [Required]
        public string SupplierName { get; set; }
        [DataType(DataType.MultilineText)]
        [DisplayName("Supplier Address")]
        public string Address { get; set; }
        [DataType(DataType.Text)]
        [MaxLength(15)]
        [DisplayName("Contact Number")]
        [Required]
        public string ContactNumber { get; set; }
        [DataType(DataType.DateTime)]
        public DateTime RecordDate { get; set; } = DateTime.Now;
        public Guid UniqueId { get; set; } = Guid.NewGuid();

        public int[] Brands { get; set; }
        public string BrandNames { get; set; }

        public virtual ICollection<BrandSuppliers> BrandSuppliers { get; set; }



        public BrandSuppliersViewModel()
        {

        }
         public BrandSuppliersViewModel(Suppliers suppliers, int[] brands, string[] brandNames)
        {
            this.SupplierId = suppliers.SupplierId;
            this.SupplierName = suppliers.SupplierName;
            this.Address = suppliers.Address;
            this.ContactNumber = suppliers.ContactNumber;
            this.UniqueId = suppliers.UniqueId;
            this.Brands = brands;
            this.BrandNames = string.Join(", ",brandNames);
        }



    }
}
