namespace MyWebApi.Models
{
    public class PurchaseResult
    {
        public bool Success { get; }
        public string Message { get; }
        public IEnumerable<ProductDto>? UpdatedProducts { get; } // Allow null

        public PurchaseResult(bool success, string message, IEnumerable<ProductDto>? updatedProducts)
        {
            Success = success;
            Message = message;
            UpdatedProducts = updatedProducts;
        }
    }
}
