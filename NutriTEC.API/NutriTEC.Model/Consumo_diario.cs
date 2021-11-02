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
        public int Id_cliente { get; set; }
        [Key]
        public int Id_producto { get; set; }
        public int Tiempo_comida { get; set; }
        public DateTime Fecha { get; set; }
    }
}
