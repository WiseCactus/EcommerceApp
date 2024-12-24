using MyWebApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyWebApi.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();

        Task<OperationResult> DelistProductAsync(int productId);

        Task<PurchaseResult> PurchaseProductsAsync(List<ProductPurchaseRequest> purchaseRequests);
    }
}
