﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{
    public class Fecha_plan_cliente
    {
        [Key]
        public int Id_plan_cliente { get; set; }
	    public DateTime Fecha { get; set; }
    }
}