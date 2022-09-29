using System.ComponentModel.DataAnnotations;

namespace BackendApp.Model
{
    public class Store
    {
        [Key]
        public int StoreId { get; set; }

        [Required(ErrorMessage = "Please Enter Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please Enter Address")]
        public string Address { get; set; }

        public ICollection<Sales>? Sales { get; set; }

    }
}
