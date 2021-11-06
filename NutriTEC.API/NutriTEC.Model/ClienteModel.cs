using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace NutriTEC.Model
{
    public class ClienteModel
    {
        public string Primer_nombre { get; set; }
        public string Segundo_nombre { get; set; }
        public string Primer_apellido { get; set; }
        public string Segundo_apellido { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public DateTime Fecha_nacimiento { get; set; }
        public float Meta_consumo_diario { get; set; }
        public string Pais { get; set; }
    }
}
