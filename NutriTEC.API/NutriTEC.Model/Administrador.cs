using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace NutriTEC.Model
{
    class Administrador
    {
        [Key]
        public int id { get; set; }
        public int id_usuario { get; set; }
    }
}
