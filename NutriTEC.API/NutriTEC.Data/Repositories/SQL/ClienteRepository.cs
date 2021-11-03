using Microsoft.Data.SqlClient;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;


namespace NutriTEC.Data.Repositories
{
    public class ClienteRepository: IClienteRepository
    {

        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;
        private readonly string _spName = "MasterClient";
        private readonly string _uniqueEmail = "UniqueEmail";

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public ClienteRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;
            
        }

        // GetAllClients: retorna la lista de clientes de la base de datos.
        // Parametros de entrada: sin parametros
        // Salida: lista de clientes
        public List<Object> GetAllClients()
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "SelectAll");

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> clientsList = new();
            List<Object> selected = AddSelectedClientsToList(dt, clientsList);
            return selected;
        }

        // **************** GET CLIENT BY ID *********************

        public Object GetClient(int id)
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
            List<Object> selected = AddSelectedClientsToList(dt, clientsList);
            if (selected.Count == 0) return null;
            return selected.FirstOrDefault();
        }

        // **************** LOGIN *********************
        public Object LogIn(string email, string clave)
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

            List<Object> clientsList = new();
            List<Object> selected = AddSelectedClientsToList(dt, clientsList);
            if (selected.Count == 0) return null;
            return selected.FirstOrDefault();
        }

        //private bool uniqueUsename(string username)
        //{

        //}

        private static List<object> AddSelectedClientsToList(DataTable dt, List<Object> clientsList)
        {
            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                clientsList.Add(
                    new
                    {
                        Id = Convert.ToInt32(dr["id"]),
                        Id_nutricionista = Convert.ToInt32(dr["id_nutricionista"]),
                        Id_conversacion = Convert.ToInt32(dr["id_conversacion"]),
                        Nombre = Convert.ToString(dr["nombre"]),
                        Primer_apellido = Convert.ToString(dr["primer_apellido"]),
                        Segundo_apellido = Convert.ToString(dr["segundo_apellido"]),
                        Email = Convert.ToString(dr["email"]),
                        Clave = Convert.ToString(dr["clave"]),
                        Fecha_nacimiento = Utils.FormattedFecha(Convert.ToDateTime(dr["fecha_nacimiento"])),
                        Edad = Convert.ToInt32(dr["edad"]),
                        Meta_consumo_diario = float.Parse(Convert.ToString(dr["meta_consumo_diario"])),
                        Altura = float.Parse(Convert.ToString(dr["altura"])),
                        Pais = Convert.ToString(dr["pais"]),
                        Estatus = Convert.ToString(dr["estatus"])
                    });
            }
            return clientsList;
        }



        // **************** INSERT NEW CLIENT *********************
        public string InsertClient(Cliente client)
        {
            if (!CheckEmailAvailability(client.Email)) return "El email ingresado ya se encuentra en uso.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Insert");

            cmd.Parameters.AddWithValue("@nombre", client.Nombre);
            cmd.Parameters.AddWithValue("@primer_apellido", client.Primer_apellido);
            cmd.Parameters.AddWithValue("@segundo_apellido", client.Segundo_apellido);
            cmd.Parameters.AddWithValue("@email", client.Email);
            cmd.Parameters.AddWithValue("@clave", client.Clave);
            cmd.Parameters.AddWithValue("@fecha_nacimiento", client.Fecha_nacimiento);
            cmd.Parameters.AddWithValue("@meta_consumo_diario", client.Meta_consumo_diario);
            cmd.Parameters.AddWithValue("@altura", client.Altura);
            cmd.Parameters.AddWithValue("@pais", client.Pais);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar al nuevo cliente. Por favor intente más tarde.";
            return "";
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


        // **************** UPDATE CLIENT *********************
        public bool UpdateClient(Cliente client)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Update");

            cmd.Parameters.AddWithValue("@id", client.Id);
            cmd.Parameters.AddWithValue("@Id_nutricionista", client.Id_nutricionista);
            cmd.Parameters.AddWithValue("@nombre", client.Nombre);
            cmd.Parameters.AddWithValue("@primer_apellido", client.Primer_apellido);
            cmd.Parameters.AddWithValue("@segundo_apellido", client.Segundo_apellido);
            cmd.Parameters.AddWithValue("@email", client.Email);
            cmd.Parameters.AddWithValue("@clave", client.Clave);
            cmd.Parameters.AddWithValue("@fecha_nacimiento", client.Fecha_nacimiento);
            cmd.Parameters.AddWithValue("@meta_consumo_diario", client.Meta_consumo_diario);
            cmd.Parameters.AddWithValue("@altura", client.Altura);
            cmd.Parameters.AddWithValue("@pais", client.Pais);
            cmd.Parameters.AddWithValue("@estatus", client.Estatus);
            cmd.Parameters.AddWithValue("@Id_conversacion", client.Id_conversacion);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            return (i >= 1);
        }

        // **************** ASSIGN NUTRICIONIST TO CLIENT *********************
        public bool AssignNutricionistToClient(int id, int id_nutricionist)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "AssignN");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@Id_nutricionista", id_nutricionist);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();
           
            return (i >= 1);
        }

        // **************** ASSIGN CONVERSATION TO CLIENT *********************
        public bool AssignConversationToClient(int id, int id_forum)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "AssignC");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@Id_conversacion", id_forum);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            return (i >= 1);
        }
    }
}
