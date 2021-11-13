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
    public class ClienteController : Controller
    {
        private readonly IClienteRepository _clientRepository;
        public ClienteController(IClienteRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        // GET: /Cliente
        // Retorna todos los clientes.
        [HttpGet, ActionName("GetAll")]
        public IActionResult GetAllClients()
        {
            ModelState.Clear();
            return Ok(_clientRepository.GetAllClients());
        }

        // GET: /Cliente/SinNutri
        // Retorna todos los clientes.
        [HttpGet("SinNutri"), ActionName("GetAll")]
        public IActionResult GetAllClientsWithoutNutri()
        {
            ModelState.Clear();
            return Ok(_clientRepository.GetAllClientsWithoutNutri());
        }

        // GET: /Cliente/1
        // Retorna al cliente que coincide con el id.
        [HttpGet("{id}"), ActionName("Get")]
        public IActionResult GetClientDetails(int id)
        {
            Object result = _clientRepository.GetClient(id);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún cliente asociado a este ID");
            // Si lo encuentra.
            return Ok(result);
        }


        // GET: /Cliente/login?email=a&clave=b
        // Retorna al cliente que coincide con los datos de log in.
        [HttpGet("login"), ActionName("Get")]
        public IActionResult LogIn(string email, string clave)
        {
            Object result = _clientRepository.LogIn(email, clave);

            // Si no se encuentra.
            if (result == null) return NotFound("Usuario o clave incorrectas.");
            // Si lo encuentra.
            return Ok(result);
        }

        // POST: /Cliente
        // Agrega un nuevo cliente a la base de datos.
        [HttpPost, ActionName("Insert")]
        public IActionResult CreateClient([FromBody] ClienteModel client)
        {
            if (client == null)
                return BadRequest("Error, la estructura del cliente no es correcta.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            object result = _clientRepository.InsertClient(client);
            if (result == null) 
                return BadRequest("No se ha logrado agregar al nuevo cliente. Por favor intente más tarde.");
            return Ok(result);
        }

        // PUT /Cliente/nutricionist/assign?id=a&forum=b
        // Asigna un nutricionista a un cliente.
        [HttpPut("nutricionist/assign"), ActionName("Assign Nutricionist")]
        public IActionResult AssignNuticionist(int id, int id_nutricionist)
        {
            var result = _clientRepository.AssignNutricionistToClient(id, id_nutricionist);

            if (result)
                return Ok();
            return BadRequest("Error, no se ha podido asignar el nutricionista al cliente.");
        }

        // PUT /Cliente/nutricionist/unassign?id=a&forum=b
        // Asigna un nutricionista a un cliente.
        [HttpPut("nutricionist/unassign"), ActionName("unAssign Nutricionist")]
        public IActionResult UnAssignNuticionist(int id)
        {
            var result = _clientRepository.UnAssignNutricionistToClient(id);

            if (result)
                return Ok();
            return BadRequest("Error, no se ha podido asignar el nutricionista al cliente.");
        }

        // POST: /Cliente/registrarMedida
        // Agrega una nueva medida a la lista de medidas
        [HttpPost("registrarMedida"), ActionName("Insert")]
        public IActionResult InsertMedida([FromBody] Medidas medida)
        {
            if (medida == null)
                return BadRequest("Error, la estructura de la medida no es correcta.");

            int result = _clientRepository.RegistrarMedidas(medida);

            if (result == -1)
                return BadRequest("Error, la fecha ingresada ya tiene medidas.");
            else if (result == 0)
                return BadRequest("Ha ocurrido un error, intentelo de nuevo");
            return Ok();
        }

        // GET: /Cliente/medidas
        // Retorna las medidas de un cliente
        [HttpGet("medidas"), ActionName("GetAll")]
        public IActionResult GetAllMedidas(int id)
        {
            ModelState.Clear();

            List<Object> medidas = _clientRepository.GetMedidas(id);

            if (medidas != null)
                return Ok(medidas);
            return NotFound("No se ha encontrado un cliente con el id solicitado");

        }

        // GET: /Cliente/lastmedidas
        // Retorna las medidas de un cliente
        [HttpGet("lastmedidas"), ActionName("GetLastMedidas")]
        public IActionResult GetLastMedidas(int id)
        {
            ModelState.Clear();

            Object medidas = _clientRepository.GetLastMedidas(id);

            if (medidas != null)
                return Ok(medidas);
            return NotFound("No se ha encontrado un cliente con el id solicitado");

        }

        // GET: /Cliente/reporteAvance
        // Retorna el reporte de avance de un cliente para un intervalo de fechas.
        [HttpGet("reporteAvance"), ActionName("GetAll")]
        public IActionResult GetAllReporteAvance(int id, DateTime fechaInicio, DateTime fechaFin)
        {
            ModelState.Clear();

            List<Object> medidas = _clientRepository.GetReporteAvance(id, fechaInicio, fechaFin);

            if (medidas != null)
                return Ok(medidas);
            return NotFound("No se ha encontrado un cliente con el id solicitado");

        }

        // POST: /Cliente/registroconsumodiario
        // Agrega un nuevo producto al consumo diario.
        [HttpPost("registroconsumodiario"), ActionName("Insert")]
        public IActionResult InsertConsumoDiario([FromBody] Consumo_diario consumo_Diario)
        {
            ModelState.Clear();

            string result = _clientRepository.RegistrarConsumoDiario(consumo_Diario);

            return Ok();
        }

    }
}
