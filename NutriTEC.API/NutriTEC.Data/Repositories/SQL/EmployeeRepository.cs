using Microsoft.Data.SqlClient;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;


        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        // Constructor
        public EmployeeRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        // **************** ADD NEW CLIENTE *********************
        public bool InsertEmployee(Employee smodel)
        {
            var conn = DbConnection;

            SqlCommand cmd = new SqlCommand("AddNewEmployee", conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@id", smodel.Id);
            cmd.Parameters.AddWithValue("@username", smodel.Username);
            cmd.Parameters.AddWithValue("@password", smodel.Password);
            cmd.Parameters.AddWithValue("@birthdate", smodel.Birthdate);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }



        /*        public IEnumerable<Employee> GetAllEmployees()
                {
                    var db = DbConnection;

                    var sql = @"  SELECT id, username, password, birthdate
                                  FROM Employees ";



                    return db.QueryAsync<Employee>(sql, new { });

                }*/

        public Object GetEmployee(int id)
        {
            var conn = DbConnection;

            Employee e = new();
            var qs = @"  SELECT id, username, password, birthdate
                          FROM Employees
                          WHERE id = @id  ";

            SqlCommand command = new(qs, conn);
            command.Parameters.AddWithValue("@id", id);

            conn.Open();

            // Verificar si se encuentra vacio.
            if (IsEmpty(command))
            {
                conn.Close();
                return null;
            }

            // Leer todas las filas y columnas.
            using (SqlDataReader oReader = command.ExecuteReader())
            {
                while (oReader.Read())
                {
                    e.Id = Int32.Parse(oReader["id"].ToString());
                    e.Username = oReader["username"].ToString();
                    e.Password = oReader["password"].ToString();
                    e.Birthdate = e.Cast_str_to_date(oReader["birthdate"].ToString());
                }
            }
            conn.Close();
            
            var output = new { e.Id, e.Username, e.Password, Birthdate = e.FormattedBirth_date };
            return output;
        }

        private static bool IsEmpty(SqlCommand cmd)
        {
            Object result = cmd.ExecuteScalar();
            return (result == null);
        }

        //public bool InsertEmployee(Employee emp)
        //{
        //    var db = dbConnection();

        //    var sql = @"  INSERT INTO public.""Employee"" (username, password, birthdate)
        //                  VALUES (@Username, @Password, @Birthdate) ";

        //    var result = db.ExecuteAsync(sql, new { emp.Username, emp.Password, emp.Birthdate });

        //    // TRUE si se inserta almenos una fila.
        //    return result > 0;
        //}

        //public bool UpdateEmployee(Employee emp)
        //{
        //    var db = dbConnection();

        //    var sql = @"  UPDATE public.""Employee""
        //                  SET username   =  @Username,
        //                      password   =  @Password,
        //                      birthdate =  @Birthdate 
        //                    WHERE id = @Id ";

        //    var result = db.ExecuteAsync(sql, new { emp.Username, emp.Password, emp.Birthdate });
        //    // Devuelve verdadero si al menos mas de una fila ha sido cambiada.
        //    return result > 0;
        //}

        //public bool DeleteEmployee(int id)
        //{
        //    var db = dbConnection();

        //    var sql = @"  DELETE
        //                  FROM public.""Employee"" 
        //                    WHERE id = @id  ";

        //    var result = db.ExecuteAsync(sql, new { Id = id });

        //    // TRUE si se elimina almenos una fila.
        //    return result > 0;
        //}
    }
}
