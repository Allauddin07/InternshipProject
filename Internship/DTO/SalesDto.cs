using System.ComponentModel.DataAnnotations;

namespace Internship.DTO
{
    public class SalesDto
    {
       

        

        public string product { get; set; }

        
        public string customer { get; set; }



        public string store { get; set; }

        [DataType(DataType.Date)]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{MM/dd/yyyy}")]
        public DateTime DateSold { get; set; }
    }
}
