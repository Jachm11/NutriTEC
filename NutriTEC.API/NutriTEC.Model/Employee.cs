using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Model
{

    public class Employee
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime Birthdate { get; set; }

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
                return string.Format("{0:dd/MM/yyyy}", Birthdate);
            }
        }

    }

}
