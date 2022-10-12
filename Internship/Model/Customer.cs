using System.ComponentModel.DataAnnotations;

namespace BackendApp.Model
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required(ErrorMessage ="Please Enter Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please Enter Address")]
        public string Address { get; set; }

        public ICollection<Sales>? sale { get; set; }
    }
}
