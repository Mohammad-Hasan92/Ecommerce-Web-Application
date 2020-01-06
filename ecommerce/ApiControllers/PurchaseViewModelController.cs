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
    public class PurchaseViewModelController : ControllerBase
    {
        // GET: api/PurchaseViewModel
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/PurchaseViewModel/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/PurchaseViewModel
        [HttpPost]
        public async Task<ActionResult<PurchaseViewModel>> PostPurchase(PurchaseViewModel purchaseVm)
        {
            EcommerceContext db = new EcommerceContext(null);

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

        // PUT: api/PurchaseViewModel/5
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
