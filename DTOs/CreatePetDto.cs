namespace PetControl.DTOs
{
    public class CreatePetDto
    {
        public string Name { get; set; }
        public string Especie { get; set; }
        public string Raca { get; set; }
        public DateTime DataNascimento { get; set; }
        public IFormFile FotoPet { get; set; }
        public char Sexo { get; set; }
        public decimal? Peso { get; set; }
        public string? Observacoes { get; set; }

    }
}
