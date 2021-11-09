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
    public class PlansController : Controller
    {
        private readonly IPlansRepository _plansRepository;
        public PlansController(IPlansRepository plansRepository)
        {
            _plansRepository = plansRepository;
        }

        // GET: /plan
        // Retorna todos los clientes.
        [HttpGet, ActionName("GetAll")]
        public IActionResult GetAllPlans(int id_nutricionista)
        {
            ModelState.Clear();
            return Ok(_plansRepository.GetAllPlans(id_nutricionista));
        }

        // GET: /plan/1
        // Retorna al plan que coincide con el id.
        [HttpGet("{id_plan}"), ActionName("Get")]
        public IActionResult GetPlanDetails(int id_plan)
        {
            Object result = _plansRepository.GetPlan(id_plan);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún plan asociado a este ID");
            // Si lo encuentra.
            return Ok(result);
        }

        // POST: /plan/
        // Agrega un nuevo plan a la lista de planes.
        [HttpPost, ActionName("Insert")]
        public IActionResult InsertPlan(int id_nutricionista, string nombre)
        {
            object result = _plansRepository.InsertPlan(id_nutricionista, nombre);
            return Ok(result);
        }

        // POST: /plan/agregarproducto
        // Agrega un nuevo producto a un plan.
        [HttpPost("agregarproducto"), ActionName("Insert")]
        public IActionResult InsertPlan([FromBody] Productos_plan productos_plan)
        {
            string result = _plansRepository.InsertProductPlan(productos_plan);
            return Ok();
        }

        // DELETE: /plan/1
        // Borra un plan.
        [HttpDelete, ActionName("Delete")]
        public IActionResult DeletePlan(int id_plan)
        {
            string result = _plansRepository.DeletePlan(id_plan);
            return Ok();
        }

        // DELETE: /plan/DeletePlanProduct
        // Elimina un producto de un plan.
        [HttpDelete("DeletePlanProduct"), ActionName("Delete")]
        public IActionResult DeletePlanProducto(int id_plan, int id_producto, string tiempo_comida)
        {
            string result = _plansRepository.DeletePlanProduct(id_plan, id_producto, tiempo_comida);
            return Ok();
        }

        // PUT: /plan/UpdatePlanProduct
        // Actualiza un producto de un plan. 
        [HttpPut("UpdatePlanProduct"), ActionName("Delete")]
        public IActionResult UpdatePlanProducto(int id_plan, int id_producto, string tiempo_comida, int porciones)
        {
            string result = _plansRepository.UpdateProductPlan(id_plan, id_producto, tiempo_comida, porciones);
            return Ok();
        }

    }
}
