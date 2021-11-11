using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data.Repositories.Interfaces
{
    public interface IClienteRepository
    {
        List<Object> GetAllClients();
        Object GetClient(int id);
        Object InsertClient(ClienteModel client);
        object LogIn(string email, string clave);
        bool AssignNutricionistToClient(int id, int id_nutricionist);
        bool UnAssignNutricionistToClient(int id);
        public string RegistrarMedidas(Medidas medida);
        public List<Object> GetMedidas(int id);
        public Object GetLastMedidas(int id);
        public string RegistrarConsumoDiario(Consumo_diario consumo_diario);
        public List<Object> GetReporteAvance(int id, DateTime fechaInicio, DateTime fechaFin);
        public List<Object> GetAllClientsWithoutNutri();


    }
}
