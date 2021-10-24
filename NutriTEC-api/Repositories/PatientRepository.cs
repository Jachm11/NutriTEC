using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NutriTec.Context;
using NutriTec.Models;

namespace NutriTec.Repositories
{    
    public class PatientRepository : IPatientRepository
    {
        private readonly SqlContext _context;

        public PatientRepository(SqlContext context)
        {
            _context = context;
        }

        public void AddPatientRecord(Patient patient)
        {
            _context.Patients.Add(patient);
            _context.SaveChanges();
        }

        public void UpdatePatientRecord(Patient patient)
        {
            _context.Patients.Update(patient);
            _context.SaveChanges();
        }

        public void DeletePatientRecord(int id)
        {
            var entity = _context.Patients.FirstOrDefault(t => t.Id == id);
            _context.Patients.Remove(entity);
            _context.SaveChanges();
        }

        public Patient GetPatientSingleRecord(int id)
        {
            return _context.Patients.FirstOrDefault(t => t.Id == id);
        }

        public List<Patient> GetPatientRecords()
        {
            return _context.Patients.ToList();
        }
    }
}
