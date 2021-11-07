using Microsoft.AspNetCore.Mvc;
using NutriTEC.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTEC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecetaController : Controller
    {

        private readonly IRecetaRepository _recetaRepository;

        public RecetaController(IRecetaRepository recetaRepository)
        {
            _recetaRepository = recetaRepository;
        }


        // GET: /recetas/1
        // Retorna las recetas que coinciden con el id.
        [HttpGet("{id}"), ActionName("Get")]
        public IActionResult GetRecipesForClient(int id)
        {
            Object result = _recetaRepository.GetRecipesForClient(id);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay recetas asociadas a este cliente");
            // Si lo encuentra.
            return Ok(result);
        }
    }
}
