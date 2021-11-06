﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Model;

namespace NutriTEC.Data
{
    public interface INutricionistaRepository
    {
        //List<Object> GetAllNutritionists();

        Object GetNutricionist(int id);

        string InsertNutricionist(Nutricionista nutricionist);

        //bool UpdateNutricionist(Nutricionista nutricionist);

        object LogIn(string email, string clave);

    }
}