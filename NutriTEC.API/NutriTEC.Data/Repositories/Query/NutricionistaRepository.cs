using Microsoft.Data.SqlClient;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using NutriTEC.Data.Repositories.Interfaces;

namespace NutriTEC.Data.Repositories.Query
{
    public class NutricionistaRepository : INutricionistaRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;

        private readonly string _spName = Utils._spNutricionist;
        private readonly string _spRegister = Utils._spRegister;
        private readonly string _spLogin = Utils._spLogin;
        private readonly string _uniqueEmail = Utils._uniqueEmail;

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public NutricionistaRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

        // #########################################################################################
        // ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS
        // #########################################################################################

        // ********************************** GET NUTRICIONIST **************************************
        // GetNutricionist: retorna el nutricionista que coincide con el id.
        // Parametros de entrada: int: id
        // Salida: object: nutricionista
        public object GetNutricionist(int id)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@StatementType", "SelectOne");

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            object nutricionist = GetOneNutricionist(dt);

            return nutricionist;
        }

        // ********************************** INSERT NUTRICIONIST ********************************
        // InsertNutricionist: inserta un nuevo nutricionista a la base de datos.
        // Parametros de entrada: NutricionistaModel: nutricionist
        // Salida: string: respuesta de operacion
        public string InsertNutricionist(NutricionistaModel nutricionist)
        {
            if (!CheckEmailAvailability(nutricionist.Email)) return "El email ingresado ya se encuentra en uso.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spRegister, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@rol", "NUTRICIONIST");

            cmd.Parameters.AddWithValue("@codigo_nutricionista", nutricionist.Codigo_nutricionista);
            cmd.Parameters.AddWithValue("@primer_nombre", nutricionist.Primer_nombre);
            cmd.Parameters.AddWithValue("@segundo_nombre", nutricionist.Segundo_nombre);
            cmd.Parameters.AddWithValue("@primer_apellido", nutricionist.Primer_apellido);
            cmd.Parameters.AddWithValue("@segundo_apellido", nutricionist.Segundo_apellido);
            cmd.Parameters.AddWithValue("@email", nutricionist.Email);
            cmd.Parameters.AddWithValue("@clave", nutricionist.Clave);
            cmd.Parameters.AddWithValue("@cedula", nutricionist.Cedula);
            cmd.Parameters.AddWithValue("@fecha_nacimiento", nutricionist.Fecha_nacimiento);
            cmd.Parameters.AddWithValue("@direccion", nutricionist.Direccion);
            cmd.Parameters.AddWithValue("@foto", nutricionist.Foto);
            cmd.Parameters.AddWithValue("@tarjeta", nutricionist.Tarjeta);
            cmd.Parameters.AddWithValue("@tipo_cobro", nutricionist.Tipo_cobro);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar al nuevo nutricionista. Por favor intente más tarde.";
            return "";

        }

        // ****************************************** LOG IN ***************************************
        // LogIn: verifica si existe un nutricionista con el email y clave pasados por parametro.
        // Parametros de entrada: string: email, clave
        // Salida: Object: nutricionista
        public object LogIn(string email, string clave)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spLogin, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@rol", "NUTRICIONIST");
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@clave", clave);

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            object nutricionist = GetOneNutricionist(dt);

            return nutricionist;
        }

        // ************************************ CHECK EMAIL ****************************************
        // CheckEmailAvailability: verifica si se encuentra disponible el email.
        // Parametros de entrada: string: email
        // Salida: bool
        private bool CheckEmailAvailability(string email)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_uniqueEmail, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@email", email);

            conn.Open();
            bool result = (bool)cmd.ExecuteScalar();
            conn.Close();
            return result;
        }



        // #########################################################################################
        // UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS
        // #########################################################################################

        // GetOneNutricionist: retorna el nutricionista obtenido de ejecutar un select by id.
        // de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: nutricionista
        private static object GetOneNutricionist(DataTable dt)
        {
            object nutricionist = null;
            if (dt.Rows.Count == 1)
            {
                nutricionist = new
                {
                    Id = Convert.ToInt32(dt.Rows[0]["id"]),
                    Id_usuario = Convert.ToInt32(dt.Rows[0]["id_usuario"]),
                    Codigo_nutricionista = Convert.ToInt32(dt.Rows[0]["codigo_nutricionista"]),
                    Estatus = Convert.ToString(dt.Rows[0]["estatus"]),
                    Primer_nombre = Convert.ToString(dt.Rows[0]["primer_nombre"]),
                    Segundo_nombre = Convert.ToString(dt.Rows[0]["segundo_nombre"]),
                    Primer_apellido = Convert.ToString(dt.Rows[0]["primer_apellido"]),
                    Segundo_apellido = Convert.ToString(dt.Rows[0]["segundo_apellido"]),
                    Email = Convert.ToString(dt.Rows[0]["email"]),
                    Clave = Convert.ToString(dt.Rows[0]["clave"]),
                    Cedula = Convert.ToString(dt.Rows[0]["cedula"]),
                    Fecha_nacimiento = Utils.FormattedFecha(Convert.ToDateTime(dt.Rows[0]["fecha_nacimiento"])),
                    Edad = Convert.ToInt32(dt.Rows[0]["edad"]),
                    Direccion = Convert.ToString(dt.Rows[0]["direccion"]),
                    Foto = Convert.ToString(dt.Rows[0]["foto"]),
                    Tarjeta = Convert.ToString(dt.Rows[0]["tarjeta"]),
                    Tipo_cobro = Convert.ToString(dt.Rows[0]["tipo_cobro"])
                };

            }
            return nutricionist;
        }
    }
}
