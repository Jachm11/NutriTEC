using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }
        public int Id_nutricionista { get; set; }
        public string Nombre { get; set; }
        public string Primer_apellido { get; set; }
        public string Segundo_apellido { get; set; }
        public string Email { get; set; }
        public string Clave { get; set; }
        public DateTime Fecha_nacimiento { get; set; }
        public float Meta_consumo_diario { get; set; }
        public float Altura { get; set; }
        public string Pais { get; set; }
        public string Estatus { get; set; }
        public int Id_conversacion { get; set; }


    }
}
