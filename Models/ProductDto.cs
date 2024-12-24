namespace MyWebApi.Models {
    public class ProductDto {
        public int Id {
            get;
            set;
        }
        public decimal Price {
            get;
            set;
        }
        public int StockQuantity {
            get;
            set;
        }


        public string Name {
            get;
            set;
        } = string.Empty;
        public string Category {
            get;
            set;
        } = string.Empty;
        public string Status {
            get;
            set;
        } = string.Empty;

    }
}