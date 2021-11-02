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
        public IActionResult getAllClients()
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
        [HttpPost, ActionName("Post")]
        public IActionResult CreateClient([FromBody] Cliente client)
        {
            if (client == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = _clientRepository.InsertClient(client);
            return Created("created", created);
        }


    }
}
