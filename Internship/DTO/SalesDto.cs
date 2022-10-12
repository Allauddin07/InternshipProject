using BackendApp.Model;
using System.ComponentModel.DataAnnotations;

namespace Internship.DTO
{
    public class SalesDto
    {


        public int saleId { get; set; }
        public int productId { get; set; }

        public string product { get; set; }
        public int customerId { get; set; }

        public string customer { get; set; }

        public int storeId { get; set; }

        public string store { get; set; }

        [DataType(DataType.Date)]
        //[DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{MM/dd/yyyy}")]
        public DateTime DateSold { get; set; }
    }
}
