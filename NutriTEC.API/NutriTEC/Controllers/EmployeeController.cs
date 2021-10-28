using Microsoft.AspNetCore.Mvc;
using NutriTEC.Data.Repositories;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTEC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        //[HttpGet, ActionName("GetAll")]
        //public async Task<IActionResult> GetAllEmployees()
        //{
        //    return Ok(await _employeeRepository.GetAllEmployees());
        //}

        [HttpGet("{id}"), ActionName("Get")]
        public IActionResult GetEmployeeDetails(int id)
        {
            return Ok(_employeeRepository.GetEmployee(id));
        }

        //[HttpPost, ActionName("Post")]
        //public IActionResult CreateEmployee([FromBody] Employee emp)
        //{
        //    if (emp == null)
        //        return BadRequest();

        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    var created = _employeeRepository.InsertEmployee(emp);
        //    return Created("created", created);
        //}

        //[HttpPut, ActionName("Put")]
        //public IActionResult UpdateEmployee([FromBody] Employee emp)
        //{
        //    if (emp == null)
        //        return BadRequest();

        //    if (!ModelState.IsValid)
        //        return BadRequest(ModelState);

        //    _employeeRepository.UpdateEmployee(emp);
        //    return NoContent();
        //}

        //[HttpDelete("{id}"), ActionName("Delete")]
        //public IActionResult DeleteEmployee(int id)
        //{

        //    _employeeRepository.DeleteEmployee(id);
        //    return NoContent();
        //}

    }
}
