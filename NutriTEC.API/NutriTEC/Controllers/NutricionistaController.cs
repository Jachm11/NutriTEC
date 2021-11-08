using Microsoft.AspNetCore.Mvc;
using NutriTEC.Data.Repositories.Interfaces;
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

        // POST: /Nutricionista
        // Agrega un nuevo nutricionista a la base de datos.
        [HttpPost, ActionName("Insert")]
        public IActionResult CreateNutricionist([FromBody] NutricionistaModel nutricionist)
        {
            if (nutricionist == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string result = _nutricionistRepository.InsertNutricionist(nutricionist);
            if (result == "") return Ok("Se ha agregado correctamente.");
            return BadRequest(result);
        }

        // GET: /Nutricionista/login?email=a&clave=b
        // Retorna al nutricionista que coincide con los datos de log in.
        [HttpGet("login"), ActionName("Get")]
        public IActionResult LogIn(string email, string clave)
        {
            Object result = _nutricionistRepository.LogIn(email, clave);

            // Si no se encuentra.
            if (result == null) return NotFound("Usuario o clave incorrectas.");
            // Si lo encuentra.
            return Ok(result);
        }



    }
}
