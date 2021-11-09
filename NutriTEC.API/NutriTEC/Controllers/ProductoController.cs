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
    public class ProductoController : Controller
    {
        private readonly IProductoRepository _productRepository;
        public ProductoController(IProductoRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // GET: /Producto
        // Retorna todos los productos.
        [HttpGet, ActionName("GetAll")]
        public IActionResult GetAllProducts()
        {
            ModelState.Clear();
            return Ok(_productRepository.GetAllProducts());
        }

        // GET: /Producto/getAllRestricted
        // Retorna todos los productos.
        [HttpGet("getAllRestricted"), ActionName("GetAll")]
        public IActionResult GetAllProductsRestricted()
        {
            ModelState.Clear();
            return Ok(_productRepository.GetAllProductsRestricted());
        }


        // GET: /Producto/1
        // Retorna al producto que coincide con el id.
        [HttpGet("{id}"), ActionName("Get")]
        public IActionResult GetProductDetails(int id)
        {
            Object result = _productRepository.GetProduct(id);

            // Si no se encuentra.
            if (result == null) return NotFound("No hay ningún producto asociado a este ID");
            // Si lo encuentra.
            return Ok(result);
        }

        // POST: /Producto
        // Agrega un nuevo producto a la base de datos.
        [HttpPost, ActionName("Insert")]
        public IActionResult CreateProduct([FromBody] Producto product)
        {
            if (product == null)
                return BadRequest("Error, el producto contiene valores nulos");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            string result = _productRepository.InsertProduct(product);
            if (result == "") return Ok();
            return BadRequest(result);
        }

        // PUT: /Cliente
        // Actualiza un nuevo cliente de la base de datos.
        [HttpPut("{id}"), ActionName("Update")]
        public IActionResult UpdateProductEstatus(int id, string estatus)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = _productRepository.UpdateProductEstatus(id, estatus);

            if (result)
                return Ok();
            
            else
                return BadRequest("Error, no se ha podido actualizar el producto.");
        }

    }
}
