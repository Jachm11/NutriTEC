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

        // GET: /nutricionista/getAllMyClients
        // Retorna todos los clientes.
        [HttpGet("getAllMyClients"), ActionName("GetAll")]
        public IActionResult GetAllClients(int id_nutricionista)
        {
            ModelState.Clear();
            return Ok(_nutricionistRepository.GetAllMyClients(id_nutricionista));
        }

        // GET: /Nutricionista/seguimientoplanfecha
        // Retorna la lista de planes asignados a una fecha.
        [HttpGet("seguimientoplanfecha"), ActionName("Get")]
        public IActionResult GetSegumientoPlan(int id_cliente)
        {
            List<object> result = _nutricionistRepository.SeguimientoPlanFecha(id_cliente);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún cliente asociado a este ID");
            // Si lo encuentra.
            return Ok(result);
        }

        // GET: /Nutricionista/seguimientoconsumo_fechas
        // Retorna la lista de consumo de cliente.
        [HttpGet("seguimientoconsumo_fechas"), ActionName("Get")]
        public IActionResult GetSeguimientoConsumoDiario(int id_cliente)
        {
            List<object> result = _nutricionistRepository.SeguimientoConsumoDiario(id_cliente);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún cliente asociado a este ID");
            // Si lo encuentra.
            return Ok(result);
        }

        // GET: /Nutricionista/seguimientoconsumo_content
        // Retorna la lista de consumo de cliente.
        [HttpGet("seguimientoconsumo_content"), ActionName("Get")]
        public IActionResult GetSeguimientoConsumoDiario(int id_cliente, DateTime fecha)
        {
            List<object> result = _nutricionistRepository.SeguimientoConsumoDiarioPorFecha(id_cliente, fecha);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún cliente asociado a este ID");
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
            if (result == "") return Ok();
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

        // POST: /Nutricionista
        // Agrega un nuevo nutricionista a la base de datos.
        [HttpPost("AssignPlanToClient"), ActionName("Insert")]
        public IActionResult AssignPlanToClient([FromBody] Plan_cliente plan_cliente)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            bool result = _nutricionistRepository.AssignPlanToClient(plan_cliente);
            if (result) return Ok();
            return BadRequest("No se puede asignar porque la fecha ya cuenta con un plan");
        }

    }
}
