using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class NutricionistaModel
    {
        public string Cedula { get; set; }
        public int Codigo_nutricionista { get; set; }
        public string Primer_nombre { get; set; }
        public string Segundo_nombre { get; set; }
        public string Primer_apellido { get; set; }
        public string Segundo_apellido { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public DateTime Fecha_nacimiento { get; set; }
        public string Direccion { get; set; }
        public string Foto { get; set; }
        public string Tarjeta { get; set; }
        public string Tipo_cobro { get; set; }
    }
}
