namespace PetControl.Models
{
    public class VaccineRecord
    {
        public Guid Id { get; set; }
        public string VaccineName { get; set; }
        public DateTime ApplicationDate { get; set; }
        public string Batch { get; set; } // Lote vacinal
        public string Veterinarian { get; set; } 
        public Guid PetId { get; set; } 
        public Pet Pet { get; set; }



        public VaccineRecord(Guid id, string vaccineName, DateTime applicationDate, string batch, string veterinarian, Guid petId)
        {
            Id = id;
            VaccineName = vaccineName;
            ApplicationDate = applicationDate;
            Batch = batch;
            Veterinarian = veterinarian;
            PetId = petId;
        }
    }
}
