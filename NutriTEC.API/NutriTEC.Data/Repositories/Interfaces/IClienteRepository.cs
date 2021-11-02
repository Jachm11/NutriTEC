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

        bool LogIn(int username, int password);

        bool AssignNutricionistToClient(int id, int id_nutricionist);

        bool AssignConversationToClient(int id, int id_forum);


    }
}
