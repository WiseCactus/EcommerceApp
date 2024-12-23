using Microsoft.EntityFrameworkCore;
using MyWebApi.Models;  // Ensure the correct namespace for Product

namespace MyWebApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        // Constructor to inject options to the base DbContext
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet represents tables in the database
        public DbSet<Product> Products { get; set; }
    }
}
