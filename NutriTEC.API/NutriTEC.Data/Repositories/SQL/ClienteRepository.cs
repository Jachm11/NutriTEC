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
            var con = DbConnection;
            List<Object> clientlist = new List<Object>();

            SqlCommand cmd = new SqlCommand("GetAllClients", con);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter sd = new SqlDataAdapter(cmd);
            DataTable dt = new DataTable();

            con.Open();
            sd.Fill(dt);
            con.Close();

            foreach (DataRow dr in dt.Rows)
            {
                clientlist.Add(
                    new 
                    {
                        Id = Convert.ToInt32(dr["id"]),
                        Id_nutricionista = Convert.ToInt32(dr["id_nutricionista"]),
                        Nombre = Convert.ToString(dr["nombre"]),
                        Primer_apellido = Convert.ToString(dr["primer_apellido"]),
                        Segundo_apellido = Convert.ToString(dr["segundo_apellido"]),
                        Email = Convert.ToString(dr["email"]),
                        Clave = Convert.ToString(dr["clave"]),
                        Fecha_nacimiento = Utils.FormattedFecha(Convert.ToDateTime(dr["fecha_nacimiento"])),
                        Meta_consumo_diario = float.Parse(Convert.ToString(dr["meta_consumo_diario"])),
                        Altura = float.Parse(Convert.ToString(dr["altura"])),
                        Pais = Convert.ToString(dr["pais"]),
                        Id_conversacion = Convert.ToInt32(dr["id_conversacion"])
                    });
            }
            return clientlist;
        }

        public Object GetClient(int id)
        {
            var con = DbConnection;

            Object client = new object();

            SqlCommand cmd = new SqlCommand("GetClient", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id", id);

            con.Open();

            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                while (sdr.Read())
                {
                    client = new
                    {
                        Id = Convert.ToInt32(sdr["id"]),
                        Id_nutricionista = Convert.ToInt32(sdr["id_nutricionista"]),
                        Nombre = Convert.ToString(sdr["nombre"]),
                        Primer_apellido = Convert.ToString(sdr["primer_apellido"]),
                        Segundo_apellido = Convert.ToString(sdr["segundo_apellido"]),
                        Email = Convert.ToString(sdr["email"]),
                        Clave = Convert.ToString(sdr["clave"]),
                        Fecha_nacimiento = Utils.FormattedFecha(Convert.ToDateTime(sdr["fecha_nacimiento"])),
                        Meta_consumo_diario = float.Parse(Convert.ToString(sdr["meta_consumo_diario"])),
                        Altura = float.Parse(Convert.ToString(sdr["altura"])),
                        Pais = Convert.ToString(sdr["pais"]),
                        Id_conversacion = Convert.ToInt32(sdr["id_conversacion"])
                    };
                }
            }
            con.Close();

            return client;

        }

        // **************** INSERT NEW CLIENT *********************
        public bool InsertClient(Cliente client)
        {
            var conn = DbConnection;

            SqlCommand cmd = new SqlCommand("AddNewClient", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            
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

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i >= 1)
                return true;
            else
                return false;
        }

        private static bool IsEmpty(SqlCommand cmd)
        {
            Object result = cmd.ExecuteScalar();
            return (result == null);
        }


    }
}
