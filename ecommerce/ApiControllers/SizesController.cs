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
    public class SizesController : ControllerBase
    {
        private readonly EcommerceContext _context;

        public SizesController(EcommerceContext context)
        {
            _context = context;
        }

        // GET: api/Sizes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sizes>>> GetSizes()
        {
            return await _context.Sizes.ToListAsync();
        }

        // GET: api/Sizes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sizes>> GetSizes(int id)
        {
            var sizes = await _context.Sizes.FindAsync(id);

            if (sizes == null)
            {
                return NotFound();
            }

            return sizes;
        }

        // PUT: api/Sizes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSizes(int id, Sizes sizes)
        {
            if (id != sizes.SizeId)
            {
                return BadRequest();
            }

            _context.Entry(sizes).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SizesExists(id))
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

        // POST: api/Sizes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Sizes>> PostSizes(Sizes sizes)
        {
            _context.Sizes.Add(sizes);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSizes", new { id = sizes.SizeId }, sizes);
        }

        // DELETE: api/Sizes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sizes>> DeleteSizes(int id)
        {
            var sizes = await _context.Sizes.FindAsync(id);
            if (sizes == null)
            {
                return NotFound();
            }

            _context.Sizes.Remove(sizes);
            await _context.SaveChangesAsync();

            return sizes;
        }

        private bool SizesExists(int id)
        {
            return _context.Sizes.Any(e => e.SizeId == id);
        }
    }
}
