using Microsoft.AspNetCore.Mvc;
using MyWebApi.Models;
using MyWebApi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using System;

namespace MyWebApi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowReactApp")]
    public class ProductController: ControllerBase {
        private readonly IProductService _productService;

        public ProductController(IProductService productService) {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            Console.WriteLine($"Returning {products.Count()} products");
            return Ok(products);
        }

        [HttpPost("purchase")]
        public async Task<IActionResult> PurchaseProducts([FromBody] List<ProductPurchaseRequest> purchaseRequests)
        {
            if (purchaseRequests == null || purchaseRequests.Count == 0)
            {
                Console.WriteLine("Purchase request failed: No products specified for purchase.");
                return BadRequest("No products specified for purchase.");
            }

            try
            {
                Console.WriteLine("Processing purchase request...");
                var result = await _productService.PurchaseProductsAsync(purchaseRequests);

                if (!result.Success)
                {
                    Console.WriteLine("Purchase failed: " + result.Message);
                    return BadRequest(result.Message);
                }

                Console.WriteLine("Purchase successful: " + result.Message);
                return Ok(new { success = true, message = result.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception during purchase: " + ex.Message);
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("delist")]
        public async Task<IActionResult> DelistProduct([FromBody] int productId)
        {
            try 
            {
                var result = await _productService.DelistProductAsync(productId);

                if (!result.Success)
                {
                    return BadRequest(new { success = false, message = result.Message });
                }

                return Ok(new { success = true, message = result.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = "Internal server error" });
            }
        }
    }
}