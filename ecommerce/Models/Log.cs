using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class Log
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int LogId { get; set; }


        [ForeignKey("Stocks")]
        public int StockId { get; set; }
       

        [DataType(DataType.Currency)]
        [DisplayName("Buying Price")]
        public decimal BuyingPrice { get; set; }

        [DisplayName("Profit Percantage")]
        public decimal ProfitPercantage { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Selling Price")]
        public decimal SellingPrice { get; set; }

        [DisplayName("Discount")]
        public decimal Discount { get; set; }

        [DataType(DataType.Currency)]
        [DisplayName("Net Selling Price")]
        public decimal NetSellingPrice => SellingPrice - (SellingPrice * Discount);

        public Guid UniqueId { get; set; } = Guid.NewGuid();


        public virtual Stocks Stocks { get; set; }
       





    }
}
