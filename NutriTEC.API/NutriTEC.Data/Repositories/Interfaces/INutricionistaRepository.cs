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

    }
}
