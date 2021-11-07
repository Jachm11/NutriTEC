using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NutriTEC.Data;
using NutriTEC.Model;
using System.Data;
using Microsoft.Data.SqlClient;

namespace NutriTEC.Data
{
    public class ProductoRepository : IProductoRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;
        private readonly string _spName = "MasterProduct";
        private readonly string _uniqueBarcode = "UniqueBarcode"; // IMPLEMENTAR ESTO

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public ProductoRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

        // #########################################################################################
        // ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS
        // #########################################################################################

        // ********************************** GET ALL PRODUCTS *************************************
        // GetAllProducts: retorna la lista de productos de la base de datos.
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de productos
        public List<object> GetAllProducts()
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

            List<Object> productList = AddSelectedProductToList(dt);
            return productList;
        }

        // ********************************** GET PRODUCT BY ID**************************************
        // GetProduct: retorna el producto que coincide con el id de la base de datos.
        // Parametros de entrada: int: id
        // Salida: Object: producto
        public object GetProduct(int id)
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

            object product = GetOneProduct(dt);

            return product;
        }

        // ************************************ INSERT PRODUCT *************************************
        // InsertProduct: inserta un nuevo producto a la base de datos
        // Parametros de entrada: Producto: product
        // Salida: string: mensaje de aviso del resultado
        public string InsertProduct(Producto product)
        {
            if (!CheckBarcodeAvailability(product.Barcode)) return "El barcode ingresado ya se encuentra en uso.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Insert");

            cmd.Parameters.AddWithValue("@barcode", product.Barcode);
            cmd.Parameters.AddWithValue("@descripcion", product.Descripcion);
            cmd.Parameters.AddWithValue("@tamano_porcion", product.Tamano_porcion);
            cmd.Parameters.AddWithValue("@sodio", product.Sodio);
            cmd.Parameters.AddWithValue("@grasa", product.Grasa);
            cmd.Parameters.AddWithValue("@energia", product.Energia);
            cmd.Parameters.AddWithValue("@hierro", product.Hierro);
            cmd.Parameters.AddWithValue("@calcio", product.Calcio);
            cmd.Parameters.AddWithValue("@proteina", product.Proteina);
            cmd.Parameters.AddWithValue("@vitamina", product.Vitamina);
            cmd.Parameters.AddWithValue("@carbohidratos", product.Carbohidratos);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar al nuevo producto. Por favor intente más tarde.";
            return "";
        }

        // ************************************ UPDATE PRODUCT *************************************
        // UpdateProductEstatus: actualiza el estado de un producto de la base de datos.
        // Parametros de entrada: Producto: product, string: estatus
        // Salida: bool
        public bool UpdateProductEstatus(int id, string estatus)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Update");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@estatus", estatus);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            return (i >= 1);
        }

        // ************************************ CHECK BARCODE **************************************
        // CheckBarcodeAvailability: verifica si se encuentra disponible el barcode.
        // Parametros de entrada: string: barcode
        // Salida: bool
        private bool CheckBarcodeAvailability(string barcode)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_uniqueBarcode, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@barcode", barcode);

            conn.Open();
            bool result = (bool)cmd.ExecuteScalar();
            conn.Close();
            return result;
        }


        // #########################################################################################
        // UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS
        // #########################################################################################

        // GetOneProduct: retorna el producto obtenido de ejecutar un select by id de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: producto
        private static object GetOneProduct(DataTable dt)
        {
            object product = null;
            if (dt.Rows.Count == 1)
            {

                product = new
                {
                    Id = Convert.ToInt32(dt.Rows[0]["id"]),
                    Barcode = Convert.ToString(dt.Rows[0]["barcode"]),
                    Estatus = Convert.ToString(dt.Rows[0]["estatus"]),
                    Tamano_porcion = float.Parse(Convert.ToString(dt.Rows[0]["tamano_porcion"])),
                    Sodio = float.Parse(Convert.ToString(dt.Rows[0]["sodio"])),
                    Grasa = float.Parse(Convert.ToString(dt.Rows[0]["grasa"])),
                    Energia = float.Parse(Convert.ToString(dt.Rows[0]["energia"])),
                    Hierro = float.Parse(Convert.ToString(dt.Rows[0]["hierro"])),
                    Calcio = float.Parse(Convert.ToString(dt.Rows[0]["calcio"])),
                    Proteina = float.Parse(Convert.ToString(dt.Rows[0]["proteina"])),
                    Vitamina = float.Parse(Convert.ToString(dt.Rows[0]["vitamina"])),
                    Carbohidratos = float.Parse(Convert.ToString(dt.Rows[0]["carbohidratos"]))
                };

            }
            return product;
        }

        // AddSelectedClientsToList: retorna la lista de clientes obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt, List<Object> clientsList
        // Salida: object: cliente
        private static List<object> AddSelectedProductToList(DataTable dt)
        {
            List<Object> productList = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                productList.Add(
                    new
                    {
                        Id = Convert.ToInt32(dr["id"]),
                        Barcode = Convert.ToString(dr["barcode"]),
                        Estatus = Convert.ToString(dr["estatus"]),
                        Tamano_porcion = float.Parse(Convert.ToString(dt.Rows[0]["tamano_porcion"])),
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
            return productList;
        }
    }
}
