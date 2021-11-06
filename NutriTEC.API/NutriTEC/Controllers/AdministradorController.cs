using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NutriTEC.Data;
using Microsoft.Data.SqlClient;
using System.Data;

namespace NutriTEC.Controllers
{
    public class AdministradorController : Controller
    {

        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;
        private readonly string _spLogin = "LogIn";

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public AdministradorController(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

        // GET: /Administrador/login?email=a&clave=b
        // Retorna al administrador que coincide con los datos de log in.
        [HttpGet("login"), ActionName("Get")]
        public ActionResult LogIn(string email, string clave)
        {

            var conn = DbConnection;

            SqlCommand cmd = new(_spLogin, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@rol", "ADMIN");
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@clave", clave);

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            object admin = GetOneAdmin(dt);

            if (admin == null)
                return NotFound("Usuario o clave incorrectas.");
            return Ok(admin);

        }

        // GetOneClient: retorna el cliente obtenido de ejecutar un select by id de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: cliente
        private static object GetOneAdmin(DataTable dt)
        {
            object admin = null;
            if (dt.Rows.Count == 1)
            {

                admin = new
                {
                    Id = Convert.ToInt32(dt.Rows[0]["id"]),
                    Id_usuario = Convert.ToInt32(dt.Rows[0]["id_usuario"]),
                    Primer_nombre = Convert.ToString(dt.Rows[0]["primer_nombre"]),
                    Segundo_nombre = Convert.ToString(dt.Rows[0]["segundo_nombre"]),
                    Primer_apellido = Convert.ToString(dt.Rows[0]["primer_apellido"]),
                    Segundo_apellido = Convert.ToString(dt.Rows[0]["segundo_apellido"]),
                    Email = Convert.ToString(dt.Rows[0]["email"]),
                    Clave = Convert.ToString(dt.Rows[0]["clave"])
                };

            }
            return admin;
        }

    }
}
