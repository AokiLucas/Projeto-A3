namespace PetControl.Models
{
    public class Pet
    {
        public Guid Id { get; set; }              
        public string Nome { get; set; }         
        public string Especie { get; set; }       
        public string Raca { get; set; }         
        public DateTime DataNascimento { get; set; } 
        public string FotoUrl { get; set; }      
        public Guid OwnerId { get; set; }
        public User Owner { get; set; } 
        public char Sexo { get; set; }       
        public decimal? Peso { get; set; }      
        public string? Observacoes { get; set; }
        public List<RegistroVacina> VaccineRecords { get; set; } = new List<RegistroVacina>();


        public Pet(string nome, string especie, string raca, DateTime dataNascimento, string fotoUrl, 
                    Guid ownerId, char sexo, decimal? peso = null, string? observacoes = null)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Especie = especie;
            Raca = raca;
            DataNascimento = dataNascimento;
            FotoUrl = fotoUrl;
            OwnerId = ownerId;
            Sexo = sexo;
            Peso = peso;
            Observacoes = observacoes;
            VaccineRecords = new List<RegistroVacina>(); // 1:N
        }
    }
}
