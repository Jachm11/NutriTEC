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
    public class NutricionistaRepository : INutricionistaRepository
    {
        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;

        private readonly string _spName = Utils._spNutricionist;
        private readonly string _spRegister = Utils._spRegister;
        private readonly string _spLogin = Utils._spLogin;
        private readonly string _uniqueEmail = Utils._uniqueEmail;

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public NutricionistaRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

        // #########################################################################################
        // ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS
        // #########################################################################################

        // ********************************** GET NUTRICIONIST **************************************
        // GetNutricionist: retorna el nutricionista que coincide con el id.
        // Parametros de entrada: int: id
        // Salida: object: nutricionista
        public object GetNutricionist(int id)
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

            object nutricionist = GetOneNutricionist(dt);

            return nutricionist;
        }

        // ********************************** INSERT NUTRICIONIST ********************************
        // InsertNutricionist: inserta un nuevo nutricionista a la base de datos.
        // Parametros de entrada: NutricionistaModel: nutricionist
        // Salida: string: respuesta de operacion
        public string InsertNutricionist(NutricionistaModel nutricionist)
        {
            if (!CheckEmailAvailability(nutricionist.Email)) return "El email ingresado ya se encuentra en uso.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spRegister, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@rol", "NUTRICIONIST");

            cmd.Parameters.AddWithValue("@codigo_nutricionista", nutricionist.Codigo_nutricionista);
            cmd.Parameters.AddWithValue("@primer_nombre", nutricionist.Primer_nombre);
            cmd.Parameters.AddWithValue("@segundo_nombre", nutricionist.Segundo_nombre);
            cmd.Parameters.AddWithValue("@primer_apellido", nutricionist.Primer_apellido);
            cmd.Parameters.AddWithValue("@segundo_apellido", nutricionist.Segundo_apellido);
            cmd.Parameters.AddWithValue("@email", nutricionist.Email);
            cmd.Parameters.AddWithValue("@clave", nutricionist.Clave);
            cmd.Parameters.AddWithValue("@cedula", nutricionist.Cedula);
            cmd.Parameters.AddWithValue("@fecha_nacimiento", nutricionist.Fecha_nacimiento);
            cmd.Parameters.AddWithValue("@direccion", nutricionist.Direccion);
            cmd.Parameters.AddWithValue("@foto", nutricionist.Foto);
            cmd.Parameters.AddWithValue("@tarjeta", nutricionist.Tarjeta);
            cmd.Parameters.AddWithValue("@tipo_cobro", nutricionist.Tipo_cobro);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar al nuevo nutricionista. Por favor intente más tarde.";
            return "";

        }

        // ****************************************** LOG IN ***************************************
        // LogIn: verifica si existe un nutricionista con el email y clave pasados por parametro.
        // Parametros de entrada: string: email, clave
        // Salida: Object: nutricionista
        public object LogIn(string email, string clave)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spLogin, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@rol", "NUTRICIONIST");
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@clave", clave);

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            object nutricionist = GetOneNutricionist(dt);

            return nutricionist;
        }

        // ************************************ CHECK EMAIL ****************************************
        // CheckEmailAvailability: verifica si se encuentra disponible el email.
        // Parametros de entrada: string: email
        // Salida: bool
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

        // ************************************ ASSIGN PLAN TO CLIENT ******************************
        // AssignPlanToClient: asigna un plan a una fecha de un cliente
        // Parametros de entrada: int: id_plan, int:id_cliente, DateTime:fecha
        // Salida: string
        public bool AssignPlanToClient(Plan_cliente plan_cliente)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "AssignPlanToClient");

            cmd.Parameters.AddWithValue("@id_plan", plan_cliente.Id_plan);
            cmd.Parameters.AddWithValue("@id_cliente", plan_cliente.Id_cliente);
            cmd.Parameters.AddWithValue("@fecha", plan_cliente.Fecha);

            conn.Open();
            bool result = (bool)cmd.ExecuteScalar();
            conn.Close();

            return result;
        }

        // ******************************** SEGUIMIENTO PLAN FECHA ******************************
        // SeguimientoPlanFecha: retorna una lista con las fechas que tienen un plan asignado
        // Parametros de entrada: int:id_cliente
        // Salida: List<object>
        public List<object> SeguimientoPlanFecha(int id_cliente)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "SeguimientoPlanFecha");
            cmd.Parameters.AddWithValue("@id_cliente", id_cliente);
            

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<object> seguimientoPlanFecha = AddSelectedSeguimientoPlanToList(dt);

            return seguimientoPlanFecha;
        }

        // ******************************** SEGUIMIENTO CONSUMO DIARIO ******************************
        // SeguimientoConsumoDiario: retorna una lista con consumos de un cliente.
        // Parametros de entrada: int:id_cliente
        // Salida: List<object>
        public List<object> SeguimientoConsumoDiario(int id_cliente)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "SeguimientoConsumoDiarioFechas");
            cmd.Parameters.AddWithValue("@id_cliente", id_cliente);


            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<object> seguimientoConsumo = AddSelectedSeguimientoConsumoToList(dt);

            return seguimientoConsumo;
        }

        // ******************************** SEGUIMIENTO CONSUMO DIARIO POR FECHA **********************
        // SeguimientoConsumoDiario: retorna una lista con consumos de un cliente por fecha.
        // Parametros de entrada: int:id_cliente, DateTime:fecha
        // Salida: List<object>
        public List<object> SeguimientoConsumoDiarioPorFecha(int id_cliente, DateTime fecha)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "SeguimientoConsumoDiarioPorFecha");
            cmd.Parameters.AddWithValue("@id_cliente", id_cliente);
            cmd.Parameters.AddWithValue("@fecha", fecha);


            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<object> seguimientoConsumo = AddSelectedSeguimientoConsumoFechaToList(dt);

            return seguimientoConsumo;
        }

        // ********************************** GET ALL MY CLIENTS **************************************
        // GetAllClients: retorna la lista de clientes que pertenecen a un nutricionista
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de clientes
        public List<Object> GetAllMyClients(int id_nutricionista)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "GetAllMyClients");
            cmd.Parameters.AddWithValue("@id", id_nutricionista);

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> clientsList = ClienteRepository.AddSelectedClientsToList(dt);
            return clientsList;
        }

        // #########################################################################################
        // UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS
        // #########################################################################################

        // GetOneNutricionist: retorna el nutricionista obtenido de ejecutar un select by id.
        // de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: nutricionista
        private static object GetOneNutricionist(DataTable dt)
        {
            object nutricionist = null;
            if (dt.Rows.Count == 1)
            {
                nutricionist = new
                {
                    Id = Convert.ToInt32(dt.Rows[0]["id"]),
                    Id_usuario = Convert.ToInt32(dt.Rows[0]["id_usuario"]),
                    Codigo_nutricionista = Convert.ToInt32(dt.Rows[0]["codigo_nutricionista"]),
                    Estatus = Convert.ToString(dt.Rows[0]["estatus"]),
                    Primer_nombre = Convert.ToString(dt.Rows[0]["primer_nombre"]),
                    Segundo_nombre = Convert.ToString(dt.Rows[0]["segundo_nombre"]),
                    Primer_apellido = Convert.ToString(dt.Rows[0]["primer_apellido"]),
                    Segundo_apellido = Convert.ToString(dt.Rows[0]["segundo_apellido"]),
                    Email = Convert.ToString(dt.Rows[0]["email"]),
                    Clave = Convert.ToString(dt.Rows[0]["clave"]),
                    Cedula = Convert.ToString(dt.Rows[0]["cedula"]),
                    Fecha_nacimiento = Utils.FormattedFecha(Convert.ToDateTime(dt.Rows[0]["fecha_nacimiento"])),
                    Edad = Convert.ToInt32(dt.Rows[0]["edad"]),
                    Direccion = Convert.ToString(dt.Rows[0]["direccion"]),
                    Foto = Convert.ToString(dt.Rows[0]["foto"]),
                    Tarjeta = Convert.ToString(dt.Rows[0]["tarjeta"]),
                    Tipo_cobro = Convert.ToString(dt.Rows[0]["tipo_cobro"])
                };

            }
            return nutricionist;
        }


        // AddSelectedSeguimientoPlanToList: retorna la lista de fechas del plan
        // obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: List<Object>: lista de seguimientoPlanFecha.
        private static List<object> AddSelectedSeguimientoPlanToList(DataTable dt)
        {
            List<Object> seguimientoPlanFecha = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                seguimientoPlanFecha.Add(
                    new
                    {
                        Id_plan = Convert.ToInt32(dr["id_plan"]),
                        Nombre = Convert.ToString(dr["nombre"]),
                        Fecha = Utils.FormattedFecha(Convert.ToDateTime(dr["fecha"]))
                    });
            }
            return seguimientoPlanFecha;
        }

        // AddSelectedSeguimientoConsumoToList: retorna la lista de fechas del consumo
        // obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: List<Object>: lista de seguimientoPlanFecha.
        private static List<object> AddSelectedSeguimientoConsumoToList(DataTable dt)
        {
            List<Object> seguimientoConsumo = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                seguimientoConsumo.Add(
                    new
                    {
                        Fecha = Utils.FormattedFecha(Convert.ToDateTime(dr["fecha"]))
                    });
            }
            return seguimientoConsumo;
        }

        // AddSelectedSeguimientoConsumoFechaToList: retorna la lista de fechas del consumo por fecha
        // obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: List<Object>: lista de seguimientoPlanFecha.
        private static List<object> AddSelectedSeguimientoConsumoFechaToList(DataTable dt)
        {
            List<Object> seguimientoConsumo = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                seguimientoConsumo.Add(
                    new
                    {
                        Id_producto = Convert.ToInt32(dr["id_producto"]),
                        Tiempo_comida = Convert.ToString(dr["tiempo_comida"]),
                        Barcode = Convert.ToString(dr["barcode"]),
                        Tamano_porcion = float.Parse(Convert.ToString(dr["tamano_porcion"])),
                        Descripcion = Convert.ToString(dr["descripcion"]),
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
            return seguimientoConsumo;
        }

    }
}
