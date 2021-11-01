using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    class Consumo_diario
    {
        [Key]
        public int id_cliente { get; set; }
        [Key]
        public int id_producto { get; set; }
        public int tiempo_comida { get; set; }
        public DateTime fecha { get; set; }
    }
}
