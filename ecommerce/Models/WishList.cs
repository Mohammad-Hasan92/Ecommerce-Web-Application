﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Models
{
    public class WishList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int WishListId { get; set; }

        [DisplayName("Date")]
        public DateTime Date { get; set; } = DateTime.Now;

        [ForeignKey("Products")]
        public int ProductId { get; set; }

        [ForeignKey("Customers")]
        public int CustomerId { get; set; }

        public virtual Customers Customers { get; set; }
        public virtual Products Products { get; set; }
    }
}
