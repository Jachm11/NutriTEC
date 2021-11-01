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
        private readonly IClienteRepository _clienteRepository;
        public ClienteController(IClienteRepository clienteRepository)
        {
            _clienteRepository = clienteRepository;
        }

        [HttpGet("{id}"), ActionName("Get")]
        public IActionResult GetClienteDetails(int id)
        {
            Object result = _clienteRepository.GetCliente(id);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún cliente asociado a este ID");
            // Si lo encuentra.
            return Ok(result);
        }


    }
}
