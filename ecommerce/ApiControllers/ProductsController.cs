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
using Microsoft.AspNetCore.Authorization;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class ProductsController : ControllerBase
    {
        private readonly EcommerceContext _context;
        private readonly IWebHostEnvironment _env;

        public ProductsController(EcommerceContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // GET: api/Products
        [HttpGet]
        //[Authorize(Policy = "Admin")]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts()
        {

            var ProductList = _context.Products.Select(r => new { r.ProductId, r.ProductName, r.SubCategory.SubCategoryName, r.Brand.BrandName,r.ProductGroup.GroupName,r.Image }).ToList();

            return ProductList;
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}"), DisableRequestSizeLimit]
        public async Task<IActionResult> PutProducts(int id, [FromForm]  Products products)
        {
            if (id != products.ProductId)
            {
                return BadRequest();
            }

            products = await UploadImage(products);

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<Products>> PostProducts([FromForm] Products products)
        {

            products = await UploadImage(products);

            _context.Products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.ProductId }, products);
        }


        private async Task<Products> UploadImage(Products products)
        {
            if (products.Upload != null && products.Upload.Length > 0)
            {
                string fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(products.Upload.FileName);


                string filePath = Path.Combine("Images", fileName);

                string uploadFolder = Path.Combine(_env.WebRootPath, filePath);

                if (!Directory.Exists(Path.GetDirectoryName(uploadFolder)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(uploadFolder));
                }

                await using (FileStream fs = new FileStream(uploadFolder, FileMode.Create))
                {
                    await products.Upload.CopyToAsync(fs);
                }

                products.Image = filePath.Replace(@"\", "/");
                products.Upload = null;
            }
            return products;
        }


        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Products>> DeleteProducts(int id)
        {
            var products = await _context.Products.FindAsync(id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();

            return products;
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
