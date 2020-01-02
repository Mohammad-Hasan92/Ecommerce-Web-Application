using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce.Data;
using ecommerce.Models;
using ecommerce.ViewModels;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public SuppliersController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandSuppliersViewModel>>> GetSuppliers()
        {




            int[] a = { };
            var data = await _context.Suppliers.Select(m =>
            new BrandSuppliersViewModel(m,
            m.BrandSuppliers.Select(b => b.Brand.BrandId).ToArray(),
                 m.BrandSuppliers.Select(b => b.Brand.BrandName).ToArray())).ToListAsync();
            return data;
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BrandSuppliersViewModel>> GetSuppliers(int id)
        {
            var suppliers = await _context.Suppliers.FindAsync(id);
            var brands = await _context.BrandSuppliers.Where(b => b.SupplierId == id).Select(m => m.BrandId).ToArrayAsync();

            var brandNames = await _context.BrandSuppliers.Where(b => b.SupplierId == id).Select(m => m.Brand.BrandName).ToArrayAsync();

            BrandSuppliersViewModel model = new BrandSuppliersViewModel(suppliers, brands, brandNames);




            if (suppliers == null)
            {
                return NotFound();
            }

            return model;
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSuppliers(int id, Suppliers suppliers)
        {
            if (id != suppliers.SupplierId)
            {
                return BadRequest();
            }

            _context.Entry(suppliers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SuppliersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Suppliers
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<BrandSuppliersViewModel>> PostSuppliers(BrandSuppliersViewModel suppliersVM)
        {
            Suppliers suppliers = new Suppliers()
            {
                SupplierId = suppliersVM.SupplierId,
                SupplierName = suppliersVM.SupplierName,
                Address = suppliersVM.Address,
                ContactNumber = suppliersVM.ContactNumber,
                RecordDate = suppliersVM.RecordDate,
                UniqueId = suppliersVM.UniqueId
            };

            _context.Suppliers.Add(suppliers);
            await _context.SaveChangesAsync();




            foreach (int item in suppliersVM.Brands)
            {
                BrandSuppliers BS = new BrandSuppliers();
                BS.SupplierId = suppliers.SupplierId;
                BS.BrandId = item;
                _context.BrandSuppliers.Add(BS);
                _context.SaveChanges();

            }



            return CreatedAtAction("GetSuppliers", new { id = suppliersVM.SupplierId }, suppliersVM);
        }

        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Suppliers>> DeleteSuppliers(int id)
        {
            var suppliers = await _context.Suppliers.FindAsync(id);
            if (suppliers == null)
            {
                return NotFound();
            }

            _context.Suppliers.Remove(suppliers);
            await _context.SaveChangesAsync();

            return suppliers;
        }

        private bool SuppliersExists(int id)
        {
            return _context.Suppliers.Any(e => e.SupplierId == id);
        }
    }
}
