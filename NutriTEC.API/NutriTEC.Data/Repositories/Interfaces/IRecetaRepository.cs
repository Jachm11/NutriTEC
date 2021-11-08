using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Model;

namespace NutriTEC.Data.Repositories.Interfaces
{
    public interface IRecetaRepository
    {
        List<Object> GetRecipesForClient(int id);

        List<Object> GetProductsForRecipe(int id);

        public string InsertRecipe(string id_cliente, string nombre);

        public string UpdateRecipeName(int id_cliente, int id_receta, string nombre);

        public string DeleteRecipe(int id);

        public string AddProduct(int id, int id_producto, float porciones);

        public string RemoveProduct(int id, int id_producto);


    }

}
