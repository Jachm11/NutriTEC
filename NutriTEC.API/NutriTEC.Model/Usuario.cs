using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace NutriTEC.Model
{
    class Usuario
    {
        [Key]
        public int Id { get; set; }
        public string Rol { get; set; }
        public string Primer_nombre { get; set; }
        public string Segundo_nombre { get; set; }
        public string Primer_apellido { get; set; }
        public string Segundo_apellido { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
    }
}
