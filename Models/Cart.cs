using System.Collections.Generic;  // Import List and KeyValuePair
namespace MyWebApi.Models;
public class Cart
{
    public List<KeyValuePair<Product,int>> CurrentItems { get; set; }

    public Cart()
    {
        CurrentItems = new List<KeyValuePair<Product, int>>();
    }

    // Example method to add items to the cart
    public void AddItem(Product product,  int quantity)
    {
        CurrentItems.Add(new KeyValuePair<Product, int>(product,quantity));
    }
}
