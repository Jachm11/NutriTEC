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

        // ********** GET ALL CLIENTS ********************
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
            var conn = DbConnection;

            Cliente e = new();
            var qs = @"  SELECT id, nombre, primer_apellido, segundo_apellido
                          FROM Cliente
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
                    e.Nombre = oReader["nombre"].ToString();
                    e.Primer_apellido = oReader["primer_apellido"].ToString();
                    e.Segundo_apellido = oReader["segundo_apellido"].ToString();
                }
            }
            conn.Close();

            var output = new { e.Id, e.Nombre, e.Primer_apellido, e.Segundo_apellido };
            return output;

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
