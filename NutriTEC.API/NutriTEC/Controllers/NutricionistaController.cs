using Microsoft.AspNetCore.Mvc;
using NutriTEC.Data;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTEC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NutricionistaController : Controller
    {
        private readonly INutricionistaRepository _nutricionistRepository;
        public NutricionistaController(INutricionistaRepository nutricionistRepository)
        {
            _nutricionistRepository = nutricionistRepository;
        }

        // GET: /Nutricionista/1
        // Retorna al nutricionista que coincide con el id.
        [HttpGet("{id}"), ActionName("Get")]
        public IActionResult GetNutricionistDetails(int id)
        {
            Object result = _nutricionistRepository.GetNutricionist(id);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún nutricionista asociado a este ID");
            // Si lo encuentra.
            return Ok(result);
        }

        // POST: /Cliente
        // Agrega un nuevo cliente a la base de datos.
        [HttpPost, ActionName("Insert")]
        public IActionResult CreateNutricionist([FromBody] Nutricionista nutricionist)
        {
            if (nutricionist == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string result = _nutricionistRepository.InsertNutricionist(nutricionist);
            if (result == "") return Ok("Se ha agregado correctamente.");
            return BadRequest(result);
        }

      
    }
}
