using Microsoft.EntityFrameworkCore;
using MyWebApi.Models;  
namespace MyWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        
        public DbSet<Product> Products { get; set; }
    }
}
