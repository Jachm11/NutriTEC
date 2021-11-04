using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data
{
    public static class Utils
    {

        public static string FormattedFecha(DateTime fecha)
        {
            return string.Format("{0:dd/MM/yyyy}", fecha);   
        }

    }
}
