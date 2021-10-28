using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data.Repositories
{
    public interface IEmployeeRepository
    {
        //IEnumerable<Employee> GetAllEmployees();
        Object GetEmployee(int id);
        //bool InsertEmployee(Employee emp);
        //bool UpdateEmployee(Employee emp);
        //bool DeleteEmployee(int id);
    }
}
