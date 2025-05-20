namespace PetControl.DTOs
{
    public class UpdatePetDto
    {
        public Guid Id { get; set; }
        public string? Nome { get; set; }
        public string? Especie { get; set; }
        public string? Raca { get; set; }
        public DateTime DataNascimento { get; set; }
        public IFormFile? FotoPet { get; set; }
        public string? FotoUrl { get; set; }
        public char Sexo { get; set; }
        public decimal? Peso { get; set; }
        public string? Observacoes { get; set; }

    }
}
