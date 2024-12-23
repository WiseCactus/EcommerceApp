using Microsoft.AspNetCore.Mvc;
using MyWebApi.Data;    // Reference ApplicationDbContext
using MyWebApi.Models;  // Reference Product model
using Microsoft.EntityFrameworkCore;

namespace MyWebApi.Controllers;

[Route("api/product")]
[ApiController]
public class ProductController : ControllerBase {
        private readonly ApplicationDbContext _context;

        // Constructor to inject the DbContext
        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }
[HttpGet]public IActionResult GetProducts()
{var products = new List<Product>
{
    new Product { Id = 1, Name = "Laptop", Category = "Electronics", Price = 999.99, Quantity = 0, StockQuantity = 5 },
    new Product { Id = 2, Name = "Smartphone", Category = "Electronics", Price = 599.99, Quantity = 0, StockQuantity = 0 }, // Sold out
    new Product { Id = 3, Name = "Tablet", Category = "Electronics", Price = 399.99, Quantity = 0, StockQuantity = 3 },
    new Product { Id = 4, Name = "Smartwatch", Category = "Electronics", Price = 199.99, Quantity = 0, StockQuantity = 10 },
    new Product { Id = 5, Name = "Headphones", Category = "Electronics", Price = 89.99, Quantity = 0, StockQuantity = 0 }, // Sold out
    new Product { Id = 6, Name = "Bluetooth Speaker", Category = "Electronics", Price = 49.99, Quantity = 0, StockQuantity = 8 },
    new Product { Id = 7, Name = "Camera", Category = "Electronics", Price = 499.99, Quantity = 0, StockQuantity = 4 },
    new Product { Id = 8, Name = "Gaming Console", Category = "Electronics", Price = 299.99, Quantity = 0, StockQuantity = 6 },
    new Product { Id = 9, Name = "LED TV", Category = "Electronics", Price = 899.99, Quantity = 0, StockQuantity = 2 },
    new Product { Id = 10, Name = "Smart Home Assistant", Category = "Electronics", Price = 129.99, Quantity = 0, StockQuantity = 0 }, // Sold out
    new Product { Id = 11, Name = "Gaming Chair", Category = "Furniture", Price = 149.99, Quantity = 0, StockQuantity = 5 },
    new Product { Id = 12, Name = "Desk", Category = "Furniture", Price = 199.99, Quantity = 0, StockQuantity = 0 }, // Sold out
    new Product { Id = 13, Name = "Office Chair", Category = "Furniture", Price = 129.99, Quantity = 0, StockQuantity = 12 },
    new Product { Id = 14, Name = "Bookshelf", Category = "Furniture", Price = 79.99, Quantity = 0, StockQuantity = 7 },
    new Product { Id = 15, Name = "Dining Table", Category = "Furniture", Price = 349.99, Quantity = 0, StockQuantity = 3 },
    new Product { Id = 16, Name = "Sofa", Category = "Furniture", Price = 499.99, Quantity = 0, StockQuantity = 6 },
    new Product { Id = 17, Name = "Coffee Table", Category = "Furniture", Price = 99.99, Quantity = 0, StockQuantity = 2 },
    new Product { Id = 18, Name = "Lawn Mower", Category = "Outdoor", Price = 199.99, Quantity = 0, StockQuantity = 4 },
    new Product { Id = 19, Name = "BBQ Grill", Category = "Outdoor", Price = 159.99, Quantity = 0, StockQuantity = 0 }, // Sold out
    new Product { Id = 20, Name = "Camping Tent", Category = "Outdoor", Price = 129.99, Quantity = 0, StockQuantity = 5 }
};

    return Ok(new { Products = products });
}[HttpPost("purchase/{id}")]
        public IActionResult PurchaseProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            if (product.StockQuantity <= 0)
            {
                return BadRequest("Product is out of stock");
            }

            // Simulate a purchase by reducing the stock quantity
            product.StockQuantity -= 1;

            _context.SaveChanges(); // Save changes to the database

            return Ok(new { message = "Product purchased successfully", product });
        }



}