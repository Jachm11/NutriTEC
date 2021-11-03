using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Plan_cliente
    {
        public int Id_plan { get; set; }
	    public int Id_cliente { get; set; }
        [Key]
        public int Id_plan_cliente { get; set; }
    }
}
