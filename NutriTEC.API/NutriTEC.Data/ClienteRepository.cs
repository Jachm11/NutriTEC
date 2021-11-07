using Microsoft.Data.SqlClient;
using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;


namespace NutriTEC.Data
{
    public class ClienteRepository : IClienteRepository
    {

        // Attributo de configuracion de conexion.
        private readonly SQLConfiguration _connectionString;
        private readonly string _spName = "MasterClient";
        private readonly string _spRegister = "Register";
        private readonly string _spLogin = "LogIn";
        private readonly string _uniqueEmail = "UniqueEmail";
        private readonly string _uniqueFechaMedida = "UniqueFechaMedida";

        // Utilizar driver de Nuget para conectarse a la DB.
        protected SqlConnection DbConnection => new(_connectionString.ConnectionString);

        public ClienteRepository(SQLConfiguration connectionString)
        {
            _connectionString = connectionString;

        }

        // #########################################################################################
        // ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS ACCESS
        // #########################################################################################


        // ********************************** GET ALL CLIENTS **************************************
        // GetAllClients: retorna la lista de clientes de la base de datos.
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de clientes
        public List<Object> GetAllClients()
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

            List<Object> clientsList = AddSelectedClientsToList(dt);
            return clientsList;
        }

        // ********************************** GET CLIENT BY ID**************************************
        // GetClient: retorna el cliente que coincide con el id de la base de datos.
        // Parametros de entrada: int: id
        // Salida: Object: cliente
        public Object GetClient(int id)
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

            object client = GetOneClient(dt);

            return client;
        }

        // ****************************************** LOG IN ***************************************
        // LogIn: verifica si existe un cliente con el email y clave pasados por parametro
        // Parametros de entrada: string: email, clave
        // Salida: Object: cliente
        public Object LogIn(string email, string clave)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spLogin, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@rol", "CLIENT");
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@clave", clave);

            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            object client = GetOneClient(dt);

            return client;
        }

        // ************************************ INSERT CLIENT **************************************
        // InsertClient: inserta un nuevo cliente a la base de datos
        // Parametros de entrada: Cliente: client
        // Salida: string: mensaje de aviso del resultado
        public string InsertClient(ClienteModel client)
        {
            
            if (!CheckEmailAvailability(client.Email)) return "El email ingresado ya se encuentra en uso.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spRegister, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@rol", "CLIENT");

            cmd.Parameters.AddWithValue("@primer_nombre", client.Primer_nombre);
            cmd.Parameters.AddWithValue("@segundo_nombre", client.Segundo_nombre);
            cmd.Parameters.AddWithValue("@primer_apellido", client.Primer_apellido);
            cmd.Parameters.AddWithValue("@segundo_apellido", client.Segundo_apellido);
            cmd.Parameters.AddWithValue("@email", client.Email);
            cmd.Parameters.AddWithValue("@clave", client.Clave);
            cmd.Parameters.AddWithValue("@fecha_nacimiento", client.Fecha_nacimiento);
            cmd.Parameters.AddWithValue("@meta_consumo_diario", client.Meta_consumo_diario);
            cmd.Parameters.AddWithValue("@pais", client.Pais);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i < 1) return "No se ha logrado agregar al nuevo cliente. Por favor intente más tarde.";
            return "";
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

        // ************************************ UPDATE CLIENT **************************************
        // UpdateClient: actualiza un cliente de la base de datos.
        // Parametros de entrada: Cliente: client
        // Salida: bool
/*        public bool UpdateClient(ClienteModel client)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "Update");

            cmd.Parameters.AddWithValue("@id", client.Id);
            cmd.Parameters.AddWithValue("@Id_nutricionista", client.Id_nutricionista);
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
            cmd.Parameters.AddWithValue("@Id_conversacion", client.Id_conversacion);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            return (i >= 1);
        }*/

        // ********************* ASSIGN NUTRICIONIST TO CLIENT *************************************
        // AssignNutricionistToClient: asigna un nutricionista a un cliente
        // Parametros de entrada: int: id, id_nutricionist
        // Salida: bool
        public bool AssignNutricionistToClient(int id, int id_nutricionist)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "AssignN");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@Id_nutricionista", id_nutricionist);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            return (i >= 1);
        }

        // ********************* ASSIGN CONVERSATION TO CLIENT *************************************
        // AssignConversationToClient: asigna un nutricionista a un cliente
        // Parametros de entrada: int: id, id_forum
        // Salida: bool
        public bool AssignConversationToClient(int id, int id_forum)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "AssignC");

            cmd.Parameters.AddWithValue("@id", id);
            cmd.Parameters.AddWithValue("@Id_conversacion", id_forum);

            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            return (i >= 1);
        }

        // ********************* REGISTRAR MEDIDAS *************************************
        // RegistrarMedidas: agrega una medida a la lista de medidas del cliente
        // Parametros de entrada: int: id, id_forum
        // Salida: bool
        public string RegistrarMedidas(Medidas medida)
        {
            if (!CheckFechaMedidaAvailability(medida.Fecha, medida.Id_cliente)) return "Error, la fecha ingresada ya tiene medidas.";

            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@StatementType", "RegistrarMedidas");

            cmd.Parameters.AddWithValue("@id", medida.Id_cliente);
            cmd.Parameters.AddWithValue("@fecha", medida.Fecha);
            cmd.Parameters.AddWithValue("@porcentaje_musculo", medida.Porcentaje_musculo);
            cmd.Parameters.AddWithValue("@porcentaje_grasa", medida.Porcentaje_grasa);
            cmd.Parameters.AddWithValue("@cadera", medida.Cadera);
            cmd.Parameters.AddWithValue("@peso", medida.Peso);
            cmd.Parameters.AddWithValue("@altura", medida.Altura);
            cmd.Parameters.AddWithValue("@cintura", medida.Cintura);
            cmd.Parameters.AddWithValue("@cuello", medida.Cuello);


            conn.Open();
            int i = cmd.ExecuteNonQuery();
            conn.Close();

            if (i == 1)
                return "Se ha agregado correctamente";
            return "Ha ocurrido un error";

        }

        // ************************************ CHECK FECHA MEDIDA ***********************************
        // CheckFechaMedidaAvailability: verifica si se encuentra disponible la fecha.
        // Parametros de entrada: DateTime: fecha
        // Salida: bool
        private bool CheckFechaMedidaAvailability(DateTime fecha, int id)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_uniqueFechaMedida, conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@fecha", fecha);
            cmd.Parameters.AddWithValue("@id_cliente", id);

            conn.Open();
            bool result = (bool)cmd.ExecuteScalar();
            conn.Close();
            return result;
        }

        // ********************************** GET MEDIDAS **************************************
        // GetMedidas: retorna las medidas del cliente.
        // Parametros de entrada: int: id
        // Salida: Object: cliente
        public List<Object> GetMedidas(int id)
        {
            var conn = DbConnection;

            SqlCommand cmd = new(_spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@StatementType", "GetMedidas");
            cmd.Parameters.AddWithValue("@id", id);
            
            SqlDataAdapter sd = new(cmd);
            DataTable dt = new();

            conn.Open();
            sd.Fill(dt);
            conn.Close();

            List<Object> medidas = AddSelectedMedidasToList(dt);

            return medidas;
        }

        // #########################################################################################
        // UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS UTILS
        // #########################################################################################

        // GetOneClient: retorna el cliente obtenido de ejecutar un select by id de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: cliente
        private static object GetOneClient(DataTable dt)
        {
            object client = null;
            if (dt.Rows.Count == 1)
            {

                client = new
                {

                    Id = Convert.ToInt32(dt.Rows[0]["id"]),
                    Id_nutricionista = Convert.ToInt32(dt.Rows[0]["id_nutricionista"]),
                    Id_conversacion = Convert.ToInt32(dt.Rows[0]["id_conversacion"]),
                    Primer_nombre = Convert.ToString(dt.Rows[0]["primer_nombre"]),
                    Segundo_nombre = Convert.ToString(dt.Rows[0]["segundo_nombre"]),
                    Primer_apellido = Convert.ToString(dt.Rows[0]["primer_apellido"]),
                    Segundo_apellido = Convert.ToString(dt.Rows[0]["segundo_apellido"]),
                    Email = Convert.ToString(dt.Rows[0]["email"]),
                    Clave = Convert.ToString(dt.Rows[0]["clave"]),
                    Fecha_nacimiento = Utils.FormattedFecha(Convert.ToDateTime(dt.Rows[0]["fecha_nacimiento"])),
                    Edad = Convert.ToInt32(dt.Rows[0]["edad"]),
                    Meta_consumo_diario = float.Parse(Convert.ToString(dt.Rows[0]["meta_consumo_diario"])),
                    Pais = Convert.ToString(dt.Rows[0]["pais"]),
                    Estatus = Convert.ToString(dt.Rows[0]["estatus"])
                };

            }
            return client;
        }

        // AddSelectedClientsToList: retorna la lista de clientes obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: cliente
        private static List<object> AddSelectedClientsToList(DataTable dt)
        {
            List<Object> clientsList = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                clientsList.Add(
                    new
                    {
                        Id = Convert.ToInt32(dr["id"]),
                        Id_nutricionista = Convert.ToInt32(dr["id_nutricionista"]),
                        Id_conversacion = Convert.ToInt32(dr["id_conversacion"]),
                        Primer_nombre = Convert.ToString(dr["primer_nombre"]),
                        Segundo_nombre = Convert.ToString(dr["segundo_nombre"]),
                        Primer_apellido = Convert.ToString(dr["primer_apellido"]),
                        Segundo_apellido = Convert.ToString(dr["segundo_apellido"]),
                        Email = Convert.ToString(dr["email"]),
                        Clave = Convert.ToString(dr["clave"]),
                        Fecha_nacimiento = Utils.FormattedFecha(Convert.ToDateTime(dr["fecha_nacimiento"])),
                        Edad = Convert.ToInt32(dr["edad"]),
                        Meta_consumo_diario = float.Parse(Convert.ToString(dr["meta_consumo_diario"])),
                        Pais = Convert.ToString(dr["pais"]),
                        Estatus = Convert.ToString(dr["estatus"])
                    });
            }
            return clientsList;
        }

        // AddSelectedMedidasToList: retorna la lista de medidas obtenidos al ejecutar un select de la base de datos
        // Parametros de entrada: DataTable: dt
        // Salida: object: cliente
        private static List<object> AddSelectedMedidasToList(DataTable dt)
        {
            List<Object> medidasList = new();

            // Leer todas las filas y columnas.
            foreach (DataRow dr in dt.Rows)
            {
                medidasList.Add(
                    new
                    {
                        Fecha = Utils.FormattedFecha(Convert.ToDateTime(dr["fecha"])),
                        Porcentaje_musculo = float.Parse(Convert.ToString(dr["porcentaje_musculo"])),
                        Porcentaje_grasa = float.Parse(Convert.ToString(dr["porcentaje_grasa"])),
                        Cadera = float.Parse(Convert.ToString(dr["cadera"])),
                        Peso = float.Parse(Convert.ToString(dr["peso"])),
                        Altura = float.Parse(Convert.ToString(dr["altura"])),
                        Cintura = float.Parse(Convert.ToString(dr["cintura"])),
                        Cuello = float.Parse(Convert.ToString(dr["cuello"])),
                    });
            }
            return medidasList;
        }


    }
}
