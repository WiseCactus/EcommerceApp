using MyWebApi.Data;
using MyWebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyWebApi.Models;

namespace MyWebApi.Services {
    public class ProductService: IProductService {
        private readonly ApplicationDbContext _dbContext;


        public ProductService(ApplicationDbContext dbContext) {
            _dbContext = dbContext;
        }

        public async Task < IEnumerable < ProductDto >> GetAllProductsAsync() {
            var products = await _dbContext.Products.ToListAsync();

            return products.Select(product => new ProductDto {
                Id = product.Id,
                    Name = product.Name,
                    Category = product.Category,
                    Price = (decimal) product.Price,
                    StockQuantity = product.StockQuantity,
                    Status = product.StockQuantity > 0 ? "In Stock" : "Out of Stock"
            });
        }

        public async Task < PurchaseResult > PurchaseProductsAsync(List < ProductPurchaseRequest > purchaseRequests) {
            var productIds = purchaseRequests.Select(request => request.Id).ToList();
            var products = await _dbContext.Products
                .Where(product => productIds.Contains(product.Id))
                .ToListAsync();

            if (products.Count != purchaseRequests.Count) {
                var missingIds = string.Join(", ", productIds.Except(products.Select(p => p.Id)));
                return new PurchaseResult(false, "Error message", new List < ProductDto > ());
            }

            var outOfStockProducts = products.Where(product =>
                purchaseRequests.Any(request => request.Id == product.Id && request.Quantity > product.StockQuantity)
            ).ToList();

            if (outOfStockProducts.Any()) {
                return new PurchaseResult(false, $"The following products are out of stock: {string.Join(", ", outOfStockProducts.Select(p => p.Name))}", null);

            }

            foreach(var product in products) {
                var purchaseRequest = purchaseRequests.First(request => request.Id == product.Id);
                product.StockQuantity -= purchaseRequest.Quantity;
            }

            await _dbContext.SaveChangesAsync();

            var updatedProducts = products.Select(product => new ProductDto {
                Id = product.Id,
                    Name = product.Name,
                    Category = product.Category,
                    Price = (decimal) product.Price,
                    StockQuantity = product.StockQuantity
            });

            return new PurchaseResult(true, "Products purchased successfully", updatedProducts);
        }

        public async Task < OperationResult > DelistProductAsync(int productId) {
            var product = await _dbContext.Products.FindAsync(productId);
            if (product == null) {
                return new OperationResult(false, "Product with ID {productId} not found.");
            }

            product.StockQuantity = 0;

            await _dbContext.SaveChangesAsync();
            return new OperationResult(true, "Product delisted successfully.");
        }
    }
}