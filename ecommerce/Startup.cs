using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using ecommerce.Data;
using ecommerce.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Security.Claims;

namespace ecommerce
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<EcommerceContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection")));

            //services.AddDefaultIdentity<ApplicationUser>()
            //    //.AddRoles<ApplicationRole>()
            //    .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddDefaultIdentity<ApplicationUser>()
                .AddRoles<IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            //services.AddIdentity<ApplicationUser, IdentityRole>()
            //    .AddEntityFrameworkStores<ApplicationDbContext>();




            services.AddIdentityServer()
                .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(
                opt =>
                {
                    opt.ApiResources[0].UserClaims.Add("role");
                    //opt.ApiResources["ecommerceAPI"].UserClaims.Add("role");
                    //opt.ApiResources["ecommerceAPI"].UserClaims.Add(ClaimTypes.Role);
                });

            services.AddAuthentication()
                .AddIdentityServerJwt();

            services.AddAuthorization(opt =>
            {
                //opt.AddPolicy("Admin", policy => policy.RequireClaim("role", "Administrator"));
                //opt.AddPolicy("Admin", policy => policy.RequireClaim(ClaimTypes.Role, "Administrator"));
                //opt.AddPolicy("Admin", policy => policy.RequireRole("Administrator"));

                opt.AddPolicy("Admin", policy => {
                    policy.RequireClaim("role", "Admin");
                    //policy.RequireRole("admin");
                });


            });





            services.AddSession(opt =>
            {
                opt.IdleTimeout = TimeSpan.FromMinutes(5);
            });
            services.AddMvc();

            //services.Configure<FormOptions>(o =>
            //{
            //    o.ValueLengthLimit = int.MaxValue;
            //    o.MultipartBodyLengthLimit = int.MaxValue;
            //    o.MemoryBufferThreshold = int.MaxValue;
            //});

            services.AddControllersWithViews().AddJsonOptions(opt => {
                opt.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
                opt.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            services.AddRazorPages();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, EcommerceContext db)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            db.Database.EnsureCreated();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseSession();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }

        //private async void AddAdminInistrator(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        //{
        //    ApplicationUser user = new ApplicationUser() { 
        //    UserName = "admin@idb.com",
        //    Email = "admin@idb.com"
        //    };

        //    IdentityRole role = new IdentityRole("Administrator");


        //    await userManager.CreateAsync(user, "123456_Az");
        //    await roleManager.CreateAsync(role);
        //    await userManager.AddToRoleAsync(user, role.Name);

        //}


    }
}
