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
        private readonly string _spLogin = Utils._spLogin;
        private readonly string _spReporteCobro = Utils._spReporteCobro;

       
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
            return Ok();

        }

        // GetOneAdmin: procesa los datos del administrador recibidos por el stored procedure.
        // Parametros de entrada: DataTable: dt
        // Salida: object: admin
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


        // GET: /Administrador/reporte-cobro
        // Retorna el reporte de cobro generado por el administrador.
        [HttpGet("reporte-cobro"), ActionName("ReporteCobro")]
        public IActionResult GetReporteCobro(string tipo)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spReporteCobro, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@tipo", tipo.ToLower());

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> result = ProcessReporte(dt);

            if (result != null)
                return Ok(result);
            return NotFound("No se han encontrado nutricionistas registrados.");
        }

        // ProcessReporte: procesa los datos para el reporte recibidos por el stored procedure.
        // Parametros de entrada: DataTable: dt
        // Salida: object: datos del reporte en una lista.
        private static List<object> ProcessReporte(DataTable dt)
        {
            List<Object> list = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                list.Add(
                    new
                    {
                        Tipo_de_pago = Convert.ToString(dr["tipo_de_pago"]),
                        Correo_electronico = Convert.ToString(dr["correo_electronico"]),
                        Nombre_completo = Convert.ToString(dr["nombre_completo"]),
                        Numero_de_tarjeta = Convert.ToString(dr["numero_de_tarjeta"]),
                        Monto_total = float.Parse(Convert.ToString(dr["monto_total"])),
                        Descuento = Convert.ToString(dr["descuento"]),
                        Monto_a_cobrar = float.Parse(Convert.ToString(dr["monto_a_cobrar"])),
                    });
            }
            return list;
        }



    }
}
