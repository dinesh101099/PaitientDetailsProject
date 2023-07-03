using Microsoft.EntityFrameworkCore;
using PatientDetailsAPI.Models;

namespace PatientDetailsAPI.Database
{
    public class PatientDbContext : DbContext
    {
        public PatientDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    }
}
