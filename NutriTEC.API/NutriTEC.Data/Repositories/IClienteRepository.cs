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

        Object GetCliente(int id);

    }
}
