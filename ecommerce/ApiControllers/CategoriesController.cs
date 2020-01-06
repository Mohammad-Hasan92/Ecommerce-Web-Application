using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ecommerce.Data;
using ecommerce.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly IWebHostEnvironment _env;

        public CategoriesController(EcommerceContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategory()
        {
            return await _context.Category.ToListAsync();
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Category.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> PutCategory(int id, [FromForm] Category category)
        {
            if (id != category.CatId)
            {
                return BadRequest();
            }

            category = await UploadImage(category);

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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

        // POST: api/Categories
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<Category>> PostCategory([FromForm] Category category)
        {
            category = await UploadImage(category);

            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.CatId }, category);
        }

        private async Task<Category> UploadImage(Category category)
        {
            if (category.Upload != null && category.Upload.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(category.Upload.FileName);


                string filePath = Path.Combine("Images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await category.Upload.CopyToAsync(fs);
                }

                category.Image = filePath.Replace(@"\", "/");
                category.Upload = null;
            }
            return category;
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategory(int id)
        {
            var category = await _context.Category.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Category.Remove(category);
            await _context.SaveChangesAsync();

            return category;
        }

        private bool CategoryExists(int id)
        {
            return _context.Category.Any(e => e.CatId == id);
        }
    }
}
