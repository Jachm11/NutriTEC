using Microsoft.AspNetCore.Mvc;
using NutriTEC.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTEC.Controllers
{
    [ApiController]
    [Route("[controller]s")]
    public class RecetaController : Controller
    {

        private readonly IRecetaRepository _recetaRepository;

        public RecetaController(IRecetaRepository recetaRepository)
        {
            _recetaRepository = recetaRepository;
        }


        // GET: /recetas/1
        // Retorna las recetas que coinciden con el id.
        [HttpGet("Cliente/{id_cliente}"), ActionName("Get")]
        public IActionResult GetRecipesForClient(int id_cliente)
        {
            Object result = _recetaRepository.GetRecipesForClient(id_cliente);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay recetas asociadas a este cliente");
            // Si lo encuentra.
            return Ok(result);
        }


        // GET: /recetas/1
        // Retorna los productos de una receta.
        [HttpGet("{id_receta}/productos"), ActionName("Get")]
        public IActionResult GetProductsForRecipe(int id_receta)
        {
            Object result = _recetaRepository.GetProductsForRecipe(id_receta);

            // Si no se encuentra.
            if (result == null) return NotFound("No se encontraron productos asociadas a esta cliente");
            // Si lo encuentra.
            return Ok(result);
        }
    }
}
