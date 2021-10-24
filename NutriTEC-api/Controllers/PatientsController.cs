using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NutriTec.Models;
using Microsoft.AspNetCore.Mvc;
using NutriTec.Repositories;

namespace NutriTec.Controllers
{
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepository _repository;

        public PatientsController(IPatientRepository dataAccessProvider)
        {
            _repository = dataAccessProvider;
        }

        [HttpGet]
        public IEnumerable<Patient> Get()
        {
            return _repository.GetPatientRecords();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Patient patient)
        {
            if (ModelState.IsValid)
            {
                //Guid obj = Guid.NewGuid();
                //patient.Id = obj.ToString();
                _repository.AddPatientRecord(patient);
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet("{id}")]
        public Patient Details(int id)
        {
            return _repository.GetPatientSingleRecord(id);
        }

        [HttpPut]
        public IActionResult Edit([FromBody] Patient patient)
        {
            if (ModelState.IsValid)
            {
                _repository.UpdatePatientRecord(patient);
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteConfirmed(int id)
        {
            var data = _repository.GetPatientSingleRecord(id);
            if (data == null)
            {
                return NotFound();
            }
            _repository.DeletePatientRecord(id);
            return Ok();
        }
    }
}