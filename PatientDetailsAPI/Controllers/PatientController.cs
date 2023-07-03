using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientDetailsAPI.Database;
using PatientDetailsAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace PatientDetailsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private PatientDbContext PatientDbContext;
        public PatientController(PatientDbContext patientDbContext)
        {
            this.PatientDbContext = patientDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetPatient()
        {
            var Patients = await PatientDbContext.Patients.ToListAsync();

            return Ok(Patients);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient([FromBody][Required] Patient patient)
        {
            patient.Id = new Guid();

            await PatientDbContext.Patients.AddAsync(patient);
            await PatientDbContext.SaveChangesAsync();

            return Ok(patient);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdatePatient([FromRoute][Required] Guid id, [FromBody][Required] Patient patient)
        {
            var patientdetails = await PatientDbContext.Patients.FirstOrDefaultAsync(a => a.Id == id);
            if (patientdetails != null)
            {
                patientdetails.Name = patient.Name;
                patientdetails.Id = patient.Id;
                patientdetails.MobileNo = patient.MobileNo;
                await PatientDbContext.SaveChangesAsync();

                return Ok(patient);
            }
            else
            {
                return NotFound("Patient not Found");
            }
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeletePatient([FromRoute] Guid id)
        {
            var patientdetails = await PatientDbContext.Patients.FirstOrDefaultAsync(a => a.Id == id);
            if (patientdetails != null)
            {
                PatientDbContext.Patients.Remove(patientdetails);
                await PatientDbContext.SaveChangesAsync();

                return Ok(patientdetails);
            }
            else
            {
                return NotFound("Patient not Found");
            }
        }
    }
}
