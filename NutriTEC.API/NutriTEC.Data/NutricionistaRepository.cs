using Microsoft.Data.SqlClient;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using NutriTEC.Data;

namespace NutriTEC.Data
{
    public class NutricionistaRepository : INutricionistaRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;
        private readonly string _spName = "MasterNutricionist";
        private readonly string _uniqueEmail = "UniqueEmail";

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public NutricionistaRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

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

        public string InsertNutricionist(Nutricionista nutricionist)
        {
            if (!CheckEmailAvailability(nutricionist.Email)) return "El email ingresado ya se encuentra en uso.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Insert");
            
            cmd.Parameters.AddWithValue("@codigo_nutricionista", nutricionist.Codigo_nutricionista);
            cmd.Parameters.AddWithValue("@nombre", nutricionist.Nombre);
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

        public object LogIn(string email, string clave)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "LogIn");

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

        // Funcion que verifica si se encuentra disponible el email a la hora de crear un usuario.
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

        // GetOneNutricionist: retorna el nutricionista obtenido de ejecutar un select by id
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
                    Codigo_nutricionista = Convert.ToInt32(dt.Rows[0]["codigo_nutricionista"]),
                    Estatus = Convert.ToString(dt.Rows[0]["estatus"]),
                    Nombre = Convert.ToString(dt.Rows[0]["nombre"]),
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
