using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Model;

namespace NutriTEC.Data
{
    public interface IProductoRepository
    {
        List<Object> GetAllProducts();

        Object GetProduct(int id);

        string InsertProduct(Producto product);

        bool UpdateProductEstatus(int id, string estatus);

    }
}
