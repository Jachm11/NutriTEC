using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Model;

namespace NutriTEC.Data.Repositories.Interfaces
{
    public interface IProductoRepository
    {
        List<Object> GetAllProducts();
        List<Object> GetAllProductsRestricted();
        Object GetProduct(int id);
        string InsertProduct(Producto product);
        bool UpdateProductEstatus(int id, string estatus);

    }
}
