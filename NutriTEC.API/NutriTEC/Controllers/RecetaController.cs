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
            if (result == null) return NotFound("No se encontraron productos asociadas a esta receta");
            // Si lo encuentra.
            return Ok(result);
        }



        // POST: /Receta
        // Agrega un nuevo producto a la base de datos.
        [HttpPost(), ActionName("Insert")]
        public IActionResult CreateReceta(string id_cliente, string nombre)
        {
            if (nombre == null)
                return BadRequest("Error, el nombre contiene valores nulos");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string result = _recetaRepository.InsertRecipe(id_cliente, nombre);
            if (result == "") return Ok();
            return BadRequest(result);
        }



        // PUT: /Receta
        // Actualiza un nuevo cliente de la base de datos.
        [HttpPut(), ActionName("Update")]
        public IActionResult UpdateRecipe(int id_cliente, int id_receta, string nombre)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string result = _recetaRepository.UpdateRecipeName(id_cliente, id_receta, nombre);
            if (result == "") return Ok();
            return BadRequest(result);
        }



        // DELETE: /Receta/1
        // Agrega un nuevo plan a la lista de planes
        [HttpDelete, ActionName("Delete")]
        public IActionResult DeleteRecipe(int id_receta)
        {
            string result = _recetaRepository.DeleteRecipe(id_receta);
            return Ok();
        }


        // POST: /Recetas/Add-Product
        // Agrega un producto de una receta 
        [HttpPost("Add-Product"), ActionName("Delete")]
        public IActionResult AddProduct(int id_receta, int id_producto, float porciones)
        {
            string result = _recetaRepository.AddProduct(id_receta, id_producto, porciones);
            return Ok();
        }


        // DELETE: /plan/DeletePlanProduct
        // Elimina un producto de una receta
        [HttpDelete("Remove-Product"), ActionName("Delete")]
        public IActionResult RemoveProduct(int id_receta, int id_producto)
        {
            string result = _recetaRepository.RemoveProduct(id_receta, id_producto);
            return Ok();
        }


    }
}
