using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce.Data;
using ecommerce.Models;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductGroupsController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public ProductGroupsController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/ProductGroups
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductGroup>>> GetProductGroup()
        {
            return await _context.ProductGroup.ToListAsync();
        }

        // GET: api/ProductGroups/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductGroup>> GetProductGroup(int id)
        {
            var productGroup = await _context.ProductGroup.FindAsync(id);

            if (productGroup == null)
            {
                return NotFound();
            }

            return productGroup;
        }

        // PUT: api/ProductGroups/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductGroup(int id, ProductGroup productGroup)
        {
            if (id != productGroup.GroupId)
            {
                return BadRequest();
            }

            _context.Entry(productGroup).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductGroupExists(id))
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

        // POST: api/ProductGroups
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ProductGroup>> PostProductGroup(ProductGroup productGroup)
        {
            _context.ProductGroup.Add(productGroup);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductGroup", new { id = productGroup.GroupId }, productGroup);
        }

        // DELETE: api/ProductGroups/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProductGroup>> DeleteProductGroup(int id)
        {
            var productGroup = await _context.ProductGroup.FindAsync(id);
            if (productGroup == null)
            {
                return NotFound();
            }

            _context.ProductGroup.Remove(productGroup);
            await _context.SaveChangesAsync();

            return productGroup;
        }

        private bool ProductGroupExists(int id)
        {
            return _context.ProductGroup.Any(e => e.GroupId == id);
        }
    }
}
