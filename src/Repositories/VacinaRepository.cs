using Microsoft.EntityFrameworkCore;
using PetControl.Data;
using PetControl.Models;

namespace PetControl.Repositories
{
    public class VacinaRepository : IVacinaRepository
    {
        private readonly AppDbContext _context;


        public VacinaRepository(AppDbContext context)
        {
            _context = context;
        }
        public void Add(RegistroVacina vacina)
        {
            _context.Add(vacina);
            _context.SaveChanges();
        }
        public void UpdateVacina(RegistroVacina vacina)
        {
            _context.Update(vacina);
            _context.SaveChanges();
        }
        public void DeleteVacina(RegistroVacina vacina)
        {
            _context.Remove(vacina);
            _context.SaveChanges();
        }
        public List<object> ObterVacinasComPet(Guid userId)
        {
            var vacinas = _context.RegistroVacinas
                .Include(v => v.Pet)
                .Where(v => v.Pet.OwnerId == userId)
                .Select(v => new
                {
                    Id = v.Id,
                    PetNome = v.Pet.Nome,
                    NomeVacina = v.NomeVacina,
                    DataAplicacao = v.DataAplicacao,
                    ValidadeImunizante = v.ValidadeImunizante
                })
                .OrderByDescending(v => v.DataAplicacao)
                .ToList<object>();

            return vacinas;
        }

        public RegistroVacina GetById(Guid id)
        {
            return _context.RegistroVacinas
                .Include(v => v.Pet)
                .FirstOrDefault(v => v.Id == id);
        }
    }
}
