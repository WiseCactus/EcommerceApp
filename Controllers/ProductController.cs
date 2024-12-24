using Microsoft.AspNetCore.Mvc;
using MyWebApi.Models;
using MyWebApi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyWebApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController: ControllerBase {
        private readonly IProductService _productService;

        public ProductController(IProductService productService) {
            _productService = productService;
        }

        [HttpGet]
        public async Task < ActionResult < IEnumerable < ProductDto >>> GetAllProducts() {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpPost("purchase")]
        public async Task < ActionResult > PurchaseProducts([FromBody] List < ProductPurchaseRequest > purchaseRequests) {
            if (purchaseRequests == null || purchaseRequests.Count == 0) {
                return BadRequest("No products specified for purchase.");
            }

            var result = await _productService.PurchaseProductsAsync(purchaseRequests);

            if (!result.Success) {
                return BadRequest(result.Message);
            }

            return Ok(new {
                Message = result.Message,
                    Products = result.UpdatedProducts
            });
        }

        [HttpPost("delist")]
        public async Task < IActionResult > DelistProduct([FromBody] int productId) {
            var result = await _productService.DelistProductAsync(productId);

            if (!result.Success) {
                return NotFound(result.Message);
            }

            return Ok(new {
                Message = result.Message,
                    ProductId = productId
            });
        }
    }
}