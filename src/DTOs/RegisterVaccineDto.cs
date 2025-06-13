namespace PetControl.DTOs
{
    public class RegisterVaccineDto
    {
        public string Name { get; set; }
        public string Lot { get; set; }
        public string ApplicationDate { get; set; }
        public string ExpireDate { get; set; }
        public string Veterinario { get; set; }
    }
}