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
        private readonly string _spRecipeName = Utils._uniqueRecipeName; // IMPLEMENTAR ESTO

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
            cmd.Parameters.AddWithValue("@id", id_receta);
            cmd.Parameters.AddWithValue("@StatementType", "SelectRecipeProducts");

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> list = AddSelectedProductsToList(dt);
            return list;
        }

        // ************************************ INSERT PRODUCT *************************************
        // InsertProduct: inserta un nuevo producto a la base de datos
        // Parametros de entrada: Producto: product
        // Salida: string: mensaje de aviso del resultado
        public string InsertRecipe(int id_cliente, string nombre)
        {
            if (!CheckRecipeNameAvailability(id_cliente, nombre)) return "Ya existe una receta con este nombre.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Insert");

            cmd.Parameters.AddWithValue("@id_cliente", id_cliente);
            cmd.Parameters.AddWithValue("@nombre", nombre);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar la nueva receta. Por favor intente más tarde.";
            return "";
        }
        

        // ************************************ UPDATE PRODUCT *************************************
        // UpdateProductEstatus: actualiza el estado de un producto de la base de datos.
        // Parametros de entrada: Producto: product, string: estatus
        // Salida: bool
        public string UpdateRecipeName(int id_cliente, int id_receta, string nombre)
        {
            if (!CheckRecipeNameAvailability(id_cliente, nombre)) return "Ya existe una receta con este nombre.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Update");

            cmd.Parameters.AddWithValue("@id", id_receta);
            cmd.Parameters.AddWithValue("@id_cliente", id_cliente);
            cmd.Parameters.AddWithValue("@nombre", nombre);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado actualizar. Por favor intente más tarde.";
            return "";
        }


        // ************************************ DELETE RECIPE *************************************
        // DeleteRecipe: actualiza el estado de un producto de la base de datos.
        // Parametros de entrada: id
        // Salida: string que indica si se logra o no.
        public string DeleteRecipe(int id)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "Delete");

            cmd.Parameters.AddWithValue("@id", id);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado eliminar la receta. Por favor intente más tarde.";
            return "Se ha eliminado correctamente.";
        }


        // ************************************ ADD PRODUCT *************************************
        // AddProduct: agrega la relacion entre una receta y un producto de la base de datos.
        // Parametros de entrada: id receta, id_producto, porciones
        // Salida: string que indica si se logra o no.
        public string AddProduct(int id, int id_producto, float porciones)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "AddProduct");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@id_producto", id_producto);
            cmd.Parameters.AddWithValue("@porcion", porciones);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar el producto a la receta. Por favor intente más tarde.";
            return "Se ha agregado correctamente.";
        }

        // ************************************ REMOVE PRODUCT *************************************
        // RemoveProduct: agrega la relacion entre una receta y un producto de la base de datos.
        // Parametros de entrada: id receta, id_producto, porciones
        // Salida: string que indica si se logra o no.
        public string RemoveProduct(int id, int id_producto)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "RemoveProduct");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@id_producto", id_producto);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado eliminar el producto de la receta. Por favor intente más tarde.";
            return "Se ha eliminado correctamente.";
        }


        // #########################################################################################
        // UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS
        // #########################################################################################

        // ************************************ CHECK NAME ****************************************
        // CheckRecipeNameAvailability: verifica si se encuentra disponible el nombre para la receta.
        // Parametros de entrada: string: nombre, int id cliente
        // Salida: bool
        private bool CheckRecipeNameAvailability(int id_cliente, string nombre)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spRecipeName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@id_cliente", id_cliente);
            cmd.Parameters.AddWithValue("@nombre", nombre);

            conn.Open();
            bool result = (bool)cmd.ExecuteScalar();
            conn.Close();
            return result;
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
                        Porcion_agregada = float.Parse(Convert.ToString(dr["porcion_agregada"])),
                        Medida_porcion = float.Parse(Convert.ToString(dr["medida_porcion"])),
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
