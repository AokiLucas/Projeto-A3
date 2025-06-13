namespace PetControl.Models
{
    public class RegistroVacina
    {
        public Guid Id { get; set; }
        public string NomeVacina { get; set; }
        public DateTime DataAplicacao { get; set; }
        public string LoteVacinal { get; set; }
        public DateTime ValidadeImunizante { get; set; }
        public string Veterinario { get; set; } 
        public Guid PetId { get; set; } 
        public Pet Pet { get; set; }



        public RegistroVacina(string nomeVacina, DateTime dataAplicacao, string loteVacinal, DateTime validadeImunizante,string veterinario, Guid petId)
        {
            Id = Guid.NewGuid();
            NomeVacina = nomeVacina;
            DataAplicacao = dataAplicacao;
            LoteVacinal = loteVacinal;
            ValidadeImunizante = validadeImunizante;
            Veterinario = veterinario;
            PetId = petId;
        }
    }
}
