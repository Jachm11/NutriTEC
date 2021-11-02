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

        // POST: /Cliente
        // Agrega un nuevo cliente a la base de datos.
        [HttpPost, ActionName("Insert")]
        public IActionResult CreateClient([FromBody] Cliente client)
        {
            if (client == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _clientRepository.InsertClient(client);
            return Created("created", result);
        }

        // Update: /Cliente
        // Actualiza un nuevo cliente de la base de datos.
        [HttpPut, ActionName("Update")]
        public IActionResult UpdateClient([FromBody] Cliente client)
        {
            if (client == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _clientRepository.UpdateClient(client);
            return Ok(result);
        }

        // PUT /Cliente/nutricionist/assign?id=a&forum=b
        [HttpPut("nutricionist/assign"), ActionName("Assign Nutricionist")]
        public IActionResult AssignNuticionist(int id, int id_nutricionist)
        {
            var result = _clientRepository.AssignNutricionistToClient(id, id_nutricionist);
            return Ok(result);
        }

        // PUT /Cliente/forum/assign?id=a&forum=b
        [HttpPut("forum/assign"), ActionName("Assign Conversation")]
        public IActionResult AssignConversation(int id, int id_forum)
        {
            var result = _clientRepository.AssignConversationToClient(id, id_forum);
            return Ok(result);
        }
    }
}
