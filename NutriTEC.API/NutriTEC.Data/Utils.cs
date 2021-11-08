using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data
{


    public static class Utils
    {
        public static readonly string _spClient = "MasterClient";
        public static readonly string _spNutricionist = "MasterNutricionist";
        public static readonly string _spPlans = "MasterPlans";
        public static readonly string _spRecipe = "MasterRecipe";
        public static readonly string _spProduct = "MasterProduct";

        public static readonly string _spRegister = "Register";
        public static readonly string _spLogin = "LogIn";

        public static readonly string _uniqueEmail = "UniqueEmail";

        public static readonly string _uniqueFechaMedida = "UniqueFechaMedida";

        public static readonly string _uniquePlanName = "UniquePlanName";

        public static readonly string _uniqueRecipeName = "UniqueRecipeName";

        public static readonly string _uniqueProductDescription = "UniqueProductDescription";
        public static readonly string _uniqueBarcode = "UniqueBarcode";



        public static string FormattedFecha(DateTime fecha)
        {
            return string.Format("{0:dd/MM/yyyy}", fecha);   
        }

    }
}
