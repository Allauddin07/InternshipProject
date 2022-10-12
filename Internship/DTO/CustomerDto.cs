using BackendApp.Model;
using System.ComponentModel.DataAnnotations;

namespace Internship.DTO
{
    public class CustomerDto
    {
        [Required(ErrorMessage = "Please Enter Name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please Enter Address")]
        public string Address { get; set; }

        public List<Sales>? sale { get; set; }
    }
}
