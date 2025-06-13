using PetControl.Models;

namespace PetControl.Repositories
{
    public interface IVacinaRepository
    {
        public void Add(RegistroVacina vacina);

        public List<object> ObterVacinasComPet(Guid userId);
        public RegistroVacina GetById(Guid id);
        public void UpdateVacina(RegistroVacina vacina);
        public void DeleteVacina(RegistroVacina vacina);

    }
}
