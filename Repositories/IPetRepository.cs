using PetControl.Models;
using System;

namespace PetControl.Repositories
{
    public interface IPetRepository
    {
        void Add(Pet user);
        Task<List<Pet>> GetAllPetsAsync(Guid ownerID);
        Task<Pet> GetPetAsync(Guid petId);
        void DeletePet(Pet pet);
        void UpdatePet(Pet pet);
    }
}
