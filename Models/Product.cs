namespace MyWebApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }  // Quantity in user's cart
        public int StockQuantity { get; set; } // Stock left in inventory
    }
}
