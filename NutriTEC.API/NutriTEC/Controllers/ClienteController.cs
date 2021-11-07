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

            string result = _clientRepository.InsertClient(client);
            if (result == "") return Ok("Se ha agregado correctamente.");
            return BadRequest(result);
        }

        // PUT: /Cliente
        // Actualiza un nuevo cliente de la base de datos.
/*        [HttpPut, ActionName("Update")]
        public IActionResult UpdateClient([FromBody] Cliente client)
        {
            if (client == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _clientRepository.UpdateClient(client);
            return Ok(result);
        }*/

        // PUT /Cliente/nutricionist/assign?id=a&forum=b
        [HttpPut("nutricionist/assign"), ActionName("Assign Nutricionist")]
        public IActionResult AssignNuticionist(int id, int id_nutricionist)
        {
            var result = _clientRepository.AssignNutricionistToClient(id, id_nutricionist);

            if (result)
                return Ok("Se ha asignado correctamente el nutricionista al cliente.");
            return BadRequest("Error, no se ha podido asignar el nutricionista al cliente.");
        }

        // PUT /Cliente/forum/assign?id=a&forum=b
        [HttpPut("forum/assign"), ActionName("Assign Conversation")]
        public IActionResult AssignConversation(int id, int id_forum)
        {
            var result = _clientRepository.AssignConversationToClient(id, id_forum);

            if (result)
                return Ok("Se ha asignado correctamente el forum al cliente.");
            return BadRequest("Error, no se ha podido asignar el forum al cliente.");
        }


        // POST: /Cliente/registrarMedida
        // Agrega una nueva medida a la lista de medidas
        [HttpPost("registrarMedida"), ActionName("Insert")]
        public IActionResult InsertMedida([FromBody] Medidas medida)
        {
            if (medida == null)
                return BadRequest("Error, la estructura de la medida no es correcta.");

            string result = _clientRepository.RegistrarMedidas(medida);
            return Ok(result);
        }

        // GET: /Cliente/medidas
        // Retorna todos los clientes.
        [HttpGet("medidas"), ActionName("GetAll")]
        public IActionResult GetAllMedidas(int id)
        {
            ModelState.Clear();

            List<Object> medidas = _clientRepository.GetMedidas(id);

            if (medidas != null)
                return Ok(medidas);
            return NotFound("No se ha encontrado un cliente con el id solicitado");

        }

    }
}
