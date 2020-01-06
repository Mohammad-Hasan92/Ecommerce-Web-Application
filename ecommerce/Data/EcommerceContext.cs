using ecommerce.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ecommerce.Data
{
    public class EcommerceContext:DbContext
    {
        public DbSet<Brand> Brands { get; set; }
        public DbSet<BrandSuppliers> BrandSuppliers { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Customers> Customers { get; set; }
        public DbSet<Orders> Orders { get; set; }
        
        public DbSet<OrdersDetails> OrdersDetails { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<ProductSizes> ProductSizes { get; set; }
        public DbSet<Purchase> Purchase { get; set; }
        public DbSet<PurchaseDetails> PurchaseDetails { get; set; }
        public DbSet<Refund> Refunds { get; set; }
        public DbSet<Sizes> Sizes { get; set; }
        public DbSet<Stocks> Stocks { get; set; }
        public DbSet<SubCategory> SubCategory { get; set; }
        public DbSet<Suppliers> Suppliers { get; set; }
        public DbSet<WishList> WishLists { get; set; }


        public EcommerceContext(DbContextOptions<EcommerceContext> opt) : base(opt)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
            modelBuilder.Entity<ProductSizes>()
                .HasKey(o => new { o.ProductId, o.SizeId });

            modelBuilder.Entity<BrandSuppliers>()
                .HasKey(o => new { o.BrandId, o.SupplierId });
        }
    }
}
