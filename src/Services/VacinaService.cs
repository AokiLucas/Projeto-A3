using Microsoft.EntityFrameworkCore;
using PetControl.DTOs;
using PetControl.Models;
using PetControl.Repositories;

namespace PetControl.Services
{
    public class VacinaService
    {
        private readonly IVacinaRepository _vacinaRepository;

        public VacinaService(IVacinaRepository vacinaRepository)
        {
            _vacinaRepository = vacinaRepository;
        }

        public void CreateVacina(RegistroVacina vacina)
        {
            _vacinaRepository.Add(vacina);
        }
        public RegistroVacina getVacina(Guid id)
        {
            return _vacinaRepository.GetById(id);
        }

        public List<dynamic> ObterVacinasComPet(Guid userID)
        {
            return _vacinaRepository.ObterVacinasComPet(userID);
        }

        public void DeleteVacina(Guid id)
        {
            var vacina = getVacina(id);
            _vacinaRepository.DeleteVacina(vacina);
        }

        public async void AtualizarVacinaComDadosParciais(UpdateVacinaDto vacinaDto)
        {
            var vacina =  getVacina(vacinaDto.Id);


            vacina.NomeVacina = vacinaDto.NomeVacina ?? vacina.NomeVacina;
            if (vacinaDto.DataAplicacao != default)
                vacina.DataAplicacao = vacina.DataAplicacao;
            vacina.LoteVacinal = vacinaDto.LoteVacinal ?? vacina.LoteVacinal;
            if (vacinaDto.ValidadeImunizante != default)
                vacina.ValidadeImunizante = vacina.ValidadeImunizante;
            vacina.Veterinario = vacinaDto.Veterinario ?? vacina.Veterinario;
            UpdateVacina(vacina);
        }

        public void UpdateVacina(RegistroVacina vacina)
        {
            _vacinaRepository.UpdateVacina(vacina);
        }
    }
}
