using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data
{
    public class SQLConfiguration
    {

        // Recibe un connectionString y lo asigna a una propiedadd.
        public SQLConfiguration(string connectionsString) => ConnectionString = connectionsString;

        public string ConnectionString { get; set; }

    }

}
