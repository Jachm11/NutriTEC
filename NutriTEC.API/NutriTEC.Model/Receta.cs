using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Receta
    {
        [Key]
        public int id { get; set; }
	    public int id_cliente { get; set; }
        public string estatus { get; set; }
        public string nombre { get; set; }
    }
}
