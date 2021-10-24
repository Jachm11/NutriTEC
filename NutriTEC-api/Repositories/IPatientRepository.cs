using NutriTec.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NutriTec.Repositories
{
    public interface IPatientRepository
    {
        void AddPatientRecord(Patient patient);
        void UpdatePatientRecord(Patient patient);
        void DeletePatientRecord(int id);
        Patient GetPatientSingleRecord(int id);
        List<Patient> GetPatientRecords();
    }
}
