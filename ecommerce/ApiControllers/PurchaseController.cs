using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ecommerce.Data;
using ecommerce.Models;
using ecommerce.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        EcommerceContext db;

        public PurchaseController(EcommerceContext db)
        {
            this.db = db;
        }
        // GET: api/Purchase
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }



        [HttpGet("GetProduct", Name = "GetProduct")]
        public ActionResult<List<Products>> GetProduct()
        {
            List<Products> products = db.Products.ToList();
            return products;
        }

        // GET: api/Purchase/GetSize/5

        [HttpGet("GetSize/{id}", Name = "GetSize")]
        public ActionResult<List<Sizes>> GetSize(int id)
        {
            List<Sizes> sizes = new List<Sizes>();
            if (id == 0)
            {
                sizes = db.Sizes.ToList();
            }
            else
            {
                sizes = db.ProductSizes.Where(s => s.ProductId == id).Select(p => p.Sizes).ToList();
            }
            
            return sizes;
        }
    

        // POST: api/Purchase
        [HttpPost]
        public async Task<ActionResult<PurchaseViewModel>> PostPurchase(PurchaseViewModel purchaseVm)
        {
           

            using (var trn = db.Database.BeginTransaction())
            {
                try
                {
                    Purchase purchase = purchaseVm.purchase;
                    db.Purchase.Add(purchase);
                    await db.SaveChangesAsync();


                    foreach (PurchaseDetails item in purchaseVm.purchasedetails)
                    {
                        item.PurchaseId = purchase.PurchaseId;
                        db.PurchaseDetails.Add(item);
                        await db.SaveChangesAsync();
                    }
                    trn.Commit();
                }
                catch (Exception)
                {
                    trn.Rollback();
                }

            }
            //return CreatedAtAction("GetPurchase", new { id = Purchase.PurchaseId }, Purchase);
            return purchaseVm;
        }

        // PUT: api/Purchase/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
