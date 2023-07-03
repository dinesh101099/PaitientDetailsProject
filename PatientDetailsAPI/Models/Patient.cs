using System.ComponentModel.DataAnnotations;

namespace PatientDetailsAPI.Models
{
    public class Patient
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string MobileNo { get; set; }
        public string EmailID { get; set; }
    }
}
