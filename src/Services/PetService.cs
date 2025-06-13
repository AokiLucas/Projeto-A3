using PetControl.DTOs;
using PetControl.Models;
using PetControl.Repositories;

namespace PetControl.Services
{
    public class PetService
    {
        private readonly IPetRepository _petRepository;
        public PetService(IPetRepository petRepository)
        {
            _petRepository = petRepository;
        }

        public void CreatePet(Pet pet)
        {
            _petRepository.Add(pet);
        }


        public async Task<Pet> GetPet(Guid pet)
        {
            return await _petRepository.GetPetAsync(pet);
        }


        public void UpdatePet(Pet pet)
        {
            _petRepository.UpdatePet(pet);
        }

        public void DeletePet(Guid id)
        {
            var pet = GetPet(id);
            _petRepository.DeletePet(pet.Result);
        }



        public async Task<List<Pet>> GetAllPets(Guid ownerID)
        {
            return await _petRepository.GetAllPetsAsync(ownerID);
        }

        public string SalvarImagemPet(IFormFile file)
        {
            var extensao = Path.GetExtension(file.FileName);
            var novoNome = $"{Guid.NewGuid()}{extensao}";
            string caminhoFisico = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "FotosPets", novoNome);

            using (var stream = new FileStream(caminhoFisico, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            return $"/FotosPets/{novoNome}";
        }


        public async void AtualizarPetComDadosParciais(UpdatePetDto petDto)
        {
            var petExistente = await GetPet(petDto.Id);
            if (petExistente == null)
                throw new Exception("Pet não encontrado.");

            petExistente.Nome = petDto.Nome ?? petExistente.Nome;
            petExistente.Especie = petDto.Especie ?? petExistente.Especie;
            petExistente.Raca = petDto.Raca ?? petExistente.Raca;

            if (petDto.DataNascimento != default)
                petExistente.DataNascimento = petDto.DataNascimento;

            if (petDto.Sexo != '\0')
                petExistente.Sexo = petDto.Sexo;

            petExistente.Peso = petDto.Peso ?? petExistente.Peso;
            petExistente.Observacoes = petDto.Observacoes ?? petExistente.Observacoes;

            if (!string.IsNullOrEmpty(petDto.FotoUrl))
            {
                petExistente.FotoUrl = petDto.FotoUrl;
            }

            UpdatePet(petExistente);
        }
    }
}
