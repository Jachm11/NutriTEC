using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Model;

namespace NutriTEC.Data.Repositories.Interfaces
{
    public interface IPlansRepository
    {

        List<Object> GetAllPlans(int id_nutricionista);
        List<Object> GetPlan(int id);
        Object GetPlanSpecific(int id);
        object InsertPlan(int id_nutricionista, string nombre);
        string InsertProductPlan(Productos_plan products_plan);
        string DeletePlan(int id);
        string DeletePlanProduct(int id, int id_producto, string tiempo_comida);
        string UpdateProductPlan(int id, int id_producto, string tiempo_comida, int porciones);
        bool UpdatePlanName(int id, string nombre);

    }
}
