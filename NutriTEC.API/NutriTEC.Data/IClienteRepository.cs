using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data
{
    public interface IClienteRepository
    {
        List<Object> GetAllClients();

        Object GetClient(int id);

        string InsertClient(ClienteModel client);

        //bool UpdateClient(ClienteModel client);

        object LogIn(string email, string clave);

        bool AssignNutricionistToClient(int id, int id_nutricionist);

        bool AssignConversationToClient(int id, int id_forum);


    }
}
