using Microsoft.Data.SqlClient;
using NutriTEC.Data.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data.Repositories.Query
{
    public class RecetaRepository : IRecetaRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;
        private readonly string _spName = Utils._spRecipe;
        private readonly string _uniqueRecipeName = Utils._uniqueRecipeName; // IMPLEMENTAR ESTO

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public RecetaRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

        // #########################################################################################
        // ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS
        // #########################################################################################


        // ********************************** GET ALL RECETAS **************************************
        // GetAllRecipes: retorna la lista de recetas de la base de datos para el cliente ingresado.
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de recetas
        public List<Object> GetRecipesForClient(int id_cliente)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id_cliente", id_cliente);
            cmd.Parameters.AddWithValue("@StatementType", "SelectClientRecipes");

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> list = AddSelectedRecipesToList(dt);
            return list;
        }

        // AddSelectedRecipesToList: retorna la lista de recetas obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: lista de recetas
        private static List<object> AddSelectedRecipesToList(DataTable dt)
        {
            List<Object> list = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                list.Add(
                    new
                    {
                        Id = Convert.ToInt32(dr["id"]),
                        Estatus = Convert.ToString(dr["estatus"]),
                        Nombre = Convert.ToString(dr["nombre"])
                    });
            }
            return list;
        }

    }
}
