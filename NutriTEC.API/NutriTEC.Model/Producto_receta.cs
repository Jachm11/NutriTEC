using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Producto_receta
    {
        [Key]
        public int id_producto { get; set; }
        [Key]
        public int id_receta { get; set; }
    }
}
