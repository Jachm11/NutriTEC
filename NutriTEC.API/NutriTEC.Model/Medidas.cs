using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Medidas
    {
        [Key]
        public int Id { get; set; }
        public int Id_cliente { get; set; }
        public DateTime Fecha { get; set; }
        public float Porcentaje_musculo { get; set; }
        public float Porcentaje_grasa { get; set; }
        public float Cadera { get; set; }
        public float Peso { get; set; }
        public float Altura { get; set; }
        public float Cintura { get; set; }
        public float Cuello { get; set; }

    }
}
