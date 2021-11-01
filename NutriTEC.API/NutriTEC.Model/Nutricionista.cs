using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Nutricionista
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public string Cedula { get; set; }
        public string Nombre { get; set; }
        public string Primer_apellido { get; set; }
        public string Segundo_apellido { get; set; }
        public int Codigo_nutricionista { get; set; }
        public float Altura { get; set; }
        public string Estatus { get; set; }
        public DateTime Fecha_nacimiento { get; set; }
        public DateTime Cast_str_to_date(string str)
        {

            DateTime convertedDate = DateTime.Parse(str);
            DateTime t = convertedDate.Date;
            return t;
        }
        public string FormattedBirth_date
        {
            get
            {
                return string.Format("{0:dd/MM/yyyy}", Fecha_nacimiento);
            }
        }
        public float Peso { get; set; }
        public string Direccion { get; set; }
        public string Foto { get; set; }
        public string Tarjeta { get; set; }
        public string Tipo_cobro { get; set; }
    }
}
