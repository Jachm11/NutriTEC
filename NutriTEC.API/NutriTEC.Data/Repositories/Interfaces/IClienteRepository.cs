using NutriTEC.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NutriTEC.Data.Repositories
{
    public interface IClienteRepository
    {
        List<Object> GetAllClients();

        Object GetClient(int id);

        bool InsertClient(Cliente client);

        bool UpdateClient(Cliente client);

        object LogIn(string email, string clave);

        bool AssignNutricionistToClient(int id, int id_nutricionist);

        bool AssignConversationToClient(int id, int id_forum);


    }
}
