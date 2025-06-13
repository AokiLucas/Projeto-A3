using Microsoft.EntityFrameworkCore;
using PetControl.Models;
using System.Collections.Generic;

namespace PetControl.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<RegistroVacina> RegistroVacinas { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite(@"Data Source=C:\Users\aokil\Documents\Studies\Faculdade\2025\Sistemas-2025\A3\PetVax\PetVax.Api\src\Data\petControl.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // 1:N entre User e Pet
            modelBuilder.Entity<Pet>()
                .HasOne(p => p.Owner)
                .WithMany(u => u.Pets)
                .HasForeignKey(p => p.OwnerId);

            // 1:N entre Pet e VaccineRecord
            modelBuilder.Entity<RegistroVacina>()
                .HasOne(v => v.Pet)
                .WithMany(p => p.VaccineRecords)
                .HasForeignKey(v => v.PetId);
        }
    }
}
