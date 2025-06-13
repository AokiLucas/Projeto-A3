using Microsoft.EntityFrameworkCore;
using PetControl.Data;
using PetControl.Models;
using System;

namespace PetControl.Repositories
{
    public class PetRepository : IPetRepository
    {
        private readonly AppDbContext _context;

        public PetRepository(AppDbContext context) { _context = context; }

        public void Add(Pet pet)
        {
            _context.Add(pet);
            _context.SaveChanges();
        }

        public void DeletePet(Pet pet)
        {
            _context.Remove(pet);
            _context.SaveChanges();
        }

        public async Task<List<Pet>> GetAllPetsAsync(Guid donoId)
        {
            return await _context.Pets
                .Include(p => p.VaccineRecords)
                .Where(p => p.OwnerId == donoId)
                .ToListAsync();
        }

        public async Task<Pet> GetPetAsync(Guid petId)
        {
            return await _context.Pets
                .FirstOrDefaultAsync(p => p.Id == petId)
                ?? throw new InvalidOperationException("Pet não encontrado.");
        }


        public void UpdatePet(Pet pet)
        {
            _context.Update(pet);
            _context.SaveChanges();
        }
    }
}
