using System.ComponentModel.DataAnnotations;

namespace shoppinglistAPI.Models
{
    public class Shopping
    {
        [Key]
        public Guid Id { get; set; }
        public string Item { get; set; }
        public int Quantity { get; set; }

    }
}
