using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Producto
    {
        [Key]
        public int Id { get; set; }
        public string Barcode { get; set; }
        public string Estatus { get; set; }
        public string Descripcion { get; set; }
        public float Tamano_porcion { get; set; }
        public float Sodio { get; set; }
        public float Grasa { get; set; }
        public float Energia { get; set; }
        public float Hierro { get; set; }
        public float Calcio { get; set; }
        public float Proteina { get; set; }
        public float Vitamina { get; set; }
        public float Carbohidratos { get; set; }
    }
}
