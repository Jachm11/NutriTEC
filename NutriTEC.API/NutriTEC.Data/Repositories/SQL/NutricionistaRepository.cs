using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Data.Repositories.Interfaces;
using NutriTEC.Model;
using System.Data;
using Microsoft.Data.SqlClient;

namespace NutriTEC.Data.Repositories.SQL
{
    class NutricionistaRepository : INutricionistaRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;
        private readonly string _spName = "MasterNutricionist";
        private readonly string _uniqueEmail = "UniqueEmail";

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);


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

            List<Object> clientsList = new();
            //List<Object> selected = AddSelectedClientsToList(dt, clientsList);
            //if (selected.Count == 0) return null;
            //return selected.FirstOrDefault();
            return null;
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
            throw new NotImplementedException();
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

    }
}
