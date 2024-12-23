function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Stock: {product.StockQuantity} available</p>
      {product.StockQuantity <= 0 ? (
        <button className="sold-out" disabled>Sold Out</button>
      ) : (
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
      )}
    </div>
  );
}

export default ProductCard;
