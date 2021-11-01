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
        public float Porcentaje_musculo { get; set; }
        public float Porcentaje_grasa { get; set; }
        public float Cadera { get; set; }
        public float Peso { get; set; }
        public float Cintura { get; set; }
        public DateTime Fecha { get; set; }
        public DateTime Cast_str_to_date(string str)
        {

            DateTime convertedDate = DateTime.Parse(str);
            DateTime t = convertedDate.Date;
            return t;
        }

        public string FormattedBirth_date
        {
            get
            {
                return string.Format("{0:dd/MM/yyyy}", Fecha);
            }
        }
        public float Cuello { get; set; }
        public string Estatus { get; set; }

    }
}
