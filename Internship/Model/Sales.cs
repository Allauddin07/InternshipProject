using System.ComponentModel.DataAnnotations;

namespace BackendApp.Model
{
    public class Sales
    {
        [Key]
        public int SalesId { get; set; }

        public int? ProductId { get; set; }

        public Product? Product { get; set; }

        public int? CustomerId { get; set; }

        public Customer? Customer { get; set; }

        public int? StoreId { get; set; }

        public Store? Store { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{dd/MM/yyyy}")]
        public DateTime DateSold { get; set; }


       
    }
}
