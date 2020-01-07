using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ecommerce.Models;

namespace ecommerce.ViewModels
{
    public class SubCategoryViewModel
    {
        public Category Cta { get; set; }
        public SubCategory Subcta { get; set; }


        public SubCategoryViewModel()
        {

        }
        public SubCategoryViewModel(SubCategory subCat, Category cta)
        {
            this.Cta = cta;
            this.Subcta = subCat;

        }
    }
}
