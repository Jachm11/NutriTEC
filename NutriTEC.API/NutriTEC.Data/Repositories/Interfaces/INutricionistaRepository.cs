using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Model;

namespace NutriTEC.Data.Repositories.Interfaces
{
    public interface INutricionistaRepository
    {
        Object GetNutricionist(int id);
        string InsertNutricionist(NutricionistaModel nutricionist);
        object LogIn(string email, string clave);
        bool AssignPlanToClient(Plan_cliente plan_cliente);

        List<object> SeguimientoPlanFecha(int id_cliente);
        List<object> SeguimientoConsumoDiario(int id_cliente);

        public List<object> SeguimientoConsumoDiarioPorFecha(int id_cliente, DateTime fecha);

    }
}
