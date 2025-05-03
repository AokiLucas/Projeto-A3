namespace PetControl.Models
{
    public class Pet
    {
        public Guid Id { get; set; }              
        public string Name { get; set; }         
        public string Species { get; set; }       // Dog, Cat
        public string Breed { get; set; }         // Breed of the pet
        public DateTime DateOfBirth { get; set; } 
        public string PhotoUrl { get; set; }      
        public Guid OwnerId { get; set; }
        public User Owner { get; set; }           // Navegação para o User (Tutor)
        public string Gender { get; set; }       
        public decimal? Weight { get; set; }      
        public string? Notes { get; set; }
        public List<VaccineRecord> VaccineRecords { get; set; } = new List<VaccineRecord>();


        public Pet(string name, string species, string breed, DateTime dateOfBirth, string photoUrl, 
                    Guid ownerId, string gender, decimal? weight = null, string? notes = null)
        {
            Id = Guid.NewGuid();
            Name = name;
            Species = species;
            Breed = breed;
            DateOfBirth = dateOfBirth;
            PhotoUrl = photoUrl;
            OwnerId = ownerId;
            Gender = gender;
            Weight = weight;
            Notes = notes;
            VaccineRecords = new List<VaccineRecord>(); // 1:N
        }
    }
}
