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
    public class OrderController : ControllerBase
    {
        EcommerceContext db;
        public OrderController(EcommerceContext db)
        {
            this.db = db;
        }

        //[HttpPost]
        //public async Task<ActionResult<OrderViewModel>> PostPurchase(OrderViewModel OrderVm)
        //{

        //    using (var trn = db.Database.BeginTransaction())
        //    {
        //        try
        //        {
        //            Orders orders = OrderVm.orders;
        //            db.Orders.Add(orders);
        //            await db.SaveChangesAsync();


        //            foreach (OrdersDetails item in OrderVm.ordersdetails)
        //            {
        //                item.OrdersId = orders.OrderId;
        //                db.OrdersDetails.Add(item);
        //                await db.SaveChangesAsync();
        //            }
        //            trn.Commit();
        //        }
        //        catch (Exception)
        //        {
        //            trn.Rollback();
        //        }

        //    }

        //    //return CreatedAtAction("GetPurchase", new { id = Purchase.PurchaseId }, Purchase);
        //    return OrderVm;
        //}



        [HttpPost]
        public async Task<ActionResult<OrderViewModel>> PostPurchase(CartVM Cvm)
        {
            OrderViewModel OrderVm = new OrderViewModel();
            using (var trn = db.Database.BeginTransaction())
            {
                try
                {
                    //int custId = db.Customers.Single(c => c.UserName == this.HttpContext.User.Identity.Name).CustomerId;


                    Orders orders = new Orders()
                    {
                        CustomerId = 1,
                        NetPrice = Cvm.Total
                    };



                    db.Orders.Add(orders);
                    await db.SaveChangesAsync();
                    foreach (CartItem cartItem in Cvm.CartItems)
                    {
                        OrdersDetails ordersDetails = new OrdersDetails();
                        ordersDetails.OrdersId = orders.OrderId;
                        ordersDetails.ProductId = cartItem.ProductId;
                        ordersDetails.Quantity = cartItem.Qty;
                        ordersDetails.UnitPrice = cartItem.Price;
                        ordersDetails.TotalPrice = cartItem.Amount;
                        db.OrdersDetails.Add(ordersDetails);
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
            return OrderVm;
        }



    }
}