namespace PetControl.DTOs
{
    public class UpdateVacinaDto
    {
        public Guid Id { get; set; }
        public string NomeVacina { get; set; }
        public DateTime DataAplicacao { get; set; }
        public string LoteVacinal { get; set; }
        public DateTime ValidadeImunizante { get; set; }
        public string Veterinario { get; set; }
    }
}
