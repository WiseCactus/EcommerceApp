namespace MyWebApi.Models
{
    public class OperationResult(bool success, string message)
    {
        public bool Success { get; set; } = success;
        public string Message { get; set; } = message;
    }
}
