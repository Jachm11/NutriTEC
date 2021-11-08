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

        // ********************************** GET ALL PRODUCTS **************************************
        // GetProductsForRecipe: retorna la lista de productos de la base de datos para la receta ingresada.
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de productos
        public List<Object> GetProductsForRecipe(int id_receta)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@id_receta", id_receta);
            cmd.Parameters.AddWithValue("@StatementType", "SelectRecipeProducts");

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> list = AddSelectedProductsToList(dt);
            return list;
        }

        

        // #########################################################################################
        // UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS
        // #########################################################################################



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


        // AddSelectedProductsToList: retorna la lista de productos obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: lista de productos
        private static List<object> AddSelectedProductsToList(DataTable dt)
        {
            List<Object> list = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                list.Add(
                    new
                    {
                        Id = Convert.ToInt32(dr["id_producto"]),
                        Barcode = Convert.ToString(dr["barcode"]),
                        Descripcion = Convert.ToString(dr["nombre_producto"]),
                        Porcion_agregada = float.Parse(Convert.ToString(dt.Rows[0]["porcion_agregada"])),
                        Medida_porcion = float.Parse(Convert.ToString(dt.Rows[0]["medida_porcion"])),
                        Sodio = float.Parse(Convert.ToString(dr["sodio"])),
                        Grasa = float.Parse(Convert.ToString(dr["grasa"])),
                        Energia = float.Parse(Convert.ToString(dr["energia"])),
                        Hierro = float.Parse(Convert.ToString(dr["hierro"])),
                        Calcio = float.Parse(Convert.ToString(dr["calcio"])),
                        Proteina = float.Parse(Convert.ToString(dr["proteina"])),
                        Vitamina = float.Parse(Convert.ToString(dr["vitamina"])),
                        Carbohidratos = float.Parse(Convert.ToString(dr["carbohidratos"]))
                    });
            }
            return list;
        }



    }
}
