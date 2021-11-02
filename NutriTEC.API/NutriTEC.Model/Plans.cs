using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Plans
    {
        [Key]
        public int Id { get; set; }
        public int Id_nutricionista { get; set; }
        public string Estatus { get; set; }
        public string Nombre { get; set; }
    }
}
