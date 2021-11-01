using Microsoft.Data.SqlClient;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace NutriTEC.Data.Repositories
{
    public class ClienteRepository: IClienteRepository
    {

        private SQLConfiguration _connectionString;

        public ClienteRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }

        protected SqlConnection dbConnection()
        {
            return new SqlConnection(_connectionString.ConnectionString);
        }

        public Object GetCliente(int id)
        {
            var conn = dbConnection();

            Cliente e = new();
            var qs = @"  SELECT id, nombre, primer_apellido, segundo_apellido
                          FROM Cliente
                          WHERE id = @id  ";

            SqlCommand command = new SqlCommand(qs, conn);
            command.Parameters.AddWithValue("@id", id);

            conn.Open();
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


    }
}
