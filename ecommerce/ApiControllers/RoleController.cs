using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce.ApiControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(RoleManager<IdentityRole> roleManager)
        {
            this._roleManager = roleManager;
        }



        [HttpGet]
        public async Task<ActionResult<List<IdentityRole>>> Get()
        {
            try
            {
                return _roleManager.Roles.ToList();
            }
            catch (Exception e)
            {

                Console.Write(e);
                return new List<IdentityRole>();
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IdentityRole>> GetRole(string id)
        {     
                return await _roleManager.FindByIdAsync(id);  
        }

        [HttpPost]
        public async Task<ActionResult<IdentityRole>> CreateRole(IdentityRole role)
        {
            role.Id = Guid.NewGuid().ToString();
            role.ConcurrencyStamp = Guid.NewGuid().ToString();
            role.NormalizedName = role.Name.ToUpper();

            await _roleManager.CreateAsync(role);

            return CreatedAtAction("GetRole", new { id = role.Id}, role);

        }

    }
}