using Microsoft.Data.SqlClient;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using NutriTEC.Data.Repositories.Interfaces;

namespace NutriTEC.Data.Repositories.Query
{
    public class PlansRepository : IPlansRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;

        private readonly string _spName = Utils._spPlans;

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public PlansRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

        // #########################################################################################
        // ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS
        // #########################################################################################


        // ********************************** GET ALL PLANS **************************************
        // GetAllPlans: retorna la lista de planes de la base de datos.
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de clientes
        public List<object> GetAllPlans(int id_nutricionista)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "SelectAll");
            cmd.Parameters.AddWithValue("@id_nutricionista", id_nutricionista);

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> planslist = AddSelectedPlansToList(dt);
            return planslist;
        }

        // ********************************** GET PLAN BY ID**************************************
        // GetClient: retorna el cliente que coincide con el id de la base de datos.
        // Parametros de entrada: int: id
        // Salida: Object: cliente
        public List<Object> GetPlan(int id)
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

            List<Object> plan = GetOnePlan(dt);

            return plan;
        }

        public object InsertPlan(int id_nutricionista, string nombre)
        {
            // FALTA EL UNIQUE NOMBRE

            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "InsertPlan");

            cmd.Parameters.AddWithValue("@id_nutricionista", id_nutricionista);
            cmd.Parameters.AddWithValue("@nombre", nombre);

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            object plan = GetOnePlanDetail(dt);

            if (plan == null) return "No se ha logrado agregar el nuevo plan. Por favor intente más tarde.";
            return plan;
        }

        public string InsertProductPlan(Productos_plan products_plan)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "InsertProductsPlan");

            cmd.Parameters.AddWithValue("@id_producto", products_plan.Id_producto);
            cmd.Parameters.AddWithValue("@id", products_plan.Id_plan);
            cmd.Parameters.AddWithValue("@tiempo_comida", products_plan.Tiempo_comida);
            cmd.Parameters.AddWithValue("@porciones", products_plan.Porciones);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar producto al plan. Por favor intente más tarde.";
            return "El producto se ha agregado correctamente al plan";
        }

        public string DeletePlan(int id)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "DeletePlan");

            cmd.Parameters.AddWithValue("@id", id);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado eliminar el plan. Por favor intente más tarde.";
            return "El plan se ha eliminado correctamente.";
        }


        public string DeletePlanProduct(int id, int id_producto, string tiempo_comida)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "DeletePlanProduct");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@id_producto", id_producto);
            cmd.Parameters.AddWithValue("@tiempo_comida", tiempo_comida);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado eliminar el producto al plan. Por favor intente más tarde.";
            return "El producto del plan se ha eliminado correctamente.";
        }

        public string UpdateProductPlan(int id, int id_producto, string tiempo_comida, int porciones)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "UpdateProductPlan");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@id_producto", id_producto);
            cmd.Parameters.AddWithValue("@tiempo_comida", tiempo_comida);
            cmd.Parameters.AddWithValue("@porciones", porciones);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado actualizar el producto al plan. Por favor intente más tarde.";
            return "El producto del plan se ha actualizado correctamente.";
        }

        // #########################################################################################
        // UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS
        // #########################################################################################


        // AddSelectedPlansToList: retorna la lista de planes obtenidos al ejecutar un select de
        // la base de datos.
        // Parametros de entrada: DataTable: dt
        // Salida: object: planslist
        private static List<object> AddSelectedPlansToList(DataTable dt)
        {
            List<Object> planslist = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                planslist.Add(
                    new
                    {
                        Id = Convert.ToInt32(dr["id"]),
                        Estatus = Convert.ToString(dr["estatus"]),
                        Nombre = Convert.ToString(dr["nombre"])
                    });
            }
            return planslist;
        }

        // GetOnePlan: retorna el plan obtenido de ejecutar un select by id de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: plan
        private static List<Object> GetOnePlan(DataTable dt)
        {
            List<Object> planslist = new();

            foreach (DataRow dr in dt.Rows)
            {
                planslist.Add( 
                    new
                    {
                        Tiempo_comida = Convert.ToString(dr["tiempo_comida"]),
                        Porciones = float.Parse(Convert.ToString(dr["porciones"])),
                        Id_producto = Convert.ToInt32(dr["id_producto"]),
                        Barcode = Convert.ToString(dr["barcode"]),
                        Descripcion = Convert.ToString(dr["descripcion"]),
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

            return planslist;
        }

        private static object GetOnePlanDetail(DataTable dt)
        {
            object plan = null;
            if (dt.Rows.Count == 1)
            {

                plan = new
                {
                    Id = Convert.ToInt32(dt.Rows[0]["id"]),
                    Nombre = Convert.ToString(dt.Rows[0]["nombre"])
                };

            }
            return plan;
        }

    }
}
