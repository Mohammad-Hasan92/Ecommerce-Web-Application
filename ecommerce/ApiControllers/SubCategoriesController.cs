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
using ecommerce.ViewModels;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly IWebHostEnvironment _env;

        public SubCategoriesController(EcommerceContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/SubCategories
        [HttpGet]
        //public async Task<ActionResult<IEnumerable<SubCategory>>> GetSubCategory()
        //{
        //    return await _context.SubCategory.ToListAsync();
        //}


        public async Task<ActionResult<IEnumerable<object>>> GetSubCategory()
        {
            


            var subCatList = _context.SubCategory.Select(r => new { r.SubCatId, r.SubCategoryName, r.Category.CategoryName,r.Image}).ToList();




            return  subCatList;
        }





        // GET: api/SubCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SubCategory>> GetSubCategory(int id)
        {
            var subCategory = await _context.SubCategory.FindAsync(id);

            if (subCategory == null)
            {
                return NotFound();
            }

            return subCategory;
        }

        // PUT: api/SubCategories/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> PutSubCategory(int id, [FromForm] SubCategory subCategory)
        {
            if (id != subCategory.SubCatId)
            {
                return BadRequest();
            }

            subCategory = await UploadImage(subCategory); 

            _context.Entry(subCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubCategoryExists(id))
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

        // POST: api/SubCategories
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<SubCategory>> PostSubCategory([FromForm] SubCategory subCategory)
        {

            subCategory = await UploadImage(subCategory);

            _context.SubCategory.Add(subCategory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubCategory", new { id = subCategory.SubCatId }, subCategory);
        }


        private async Task<SubCategory> UploadImage(SubCategory subCategory)
        {
            if (subCategory.Upload != null && subCategory.Upload.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(subCategory.Upload.FileName);


                string filePath = Path.Combine("Images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await subCategory.Upload.CopyToAsync(fs);
                }

                subCategory.Image = filePath.Replace(@"\", "/");
                subCategory.Upload = null;
            }
            return subCategory;
        }

        // DELETE: api/SubCategories/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SubCategory>> DeleteSubCategory(int id)
        {
            var subCategory = await _context.SubCategory.FindAsync(id);
            if (subCategory == null)
            {
                return NotFound();
            }

            _context.SubCategory.Remove(subCategory);
            await _context.SaveChangesAsync();

            return subCategory;
        }

        private bool SubCategoryExists(int id)
        {
            return _context.SubCategory.Any(e => e.SubCatId == id);
        }
    }
}
