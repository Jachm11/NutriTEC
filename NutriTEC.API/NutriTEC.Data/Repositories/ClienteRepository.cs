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

        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);


        public ClienteRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;
        }


        public Object GetCliente(int id)
        {
            var conn = DbConnection;

            Cliente e = new();
            var qs = @"  SELECT id, nombre, primer_apellido, segundo_apellido
                          FROM Clientes
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
        private static bool IsEmpty(SqlCommand cmd)
        {
            Object result = cmd.ExecuteScalar();
            return (result == null);
        }


    }
}
