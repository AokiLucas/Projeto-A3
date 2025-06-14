using System;
using System.Collections.Generic;

namespace PetControl.DTOs
{
    public class VaccineRecordDto
    {
        public Guid Id { get; set; }
        public string NomeVacina { get; set; }
        public DateTime DataAplicacao { get; set; }
        public string LoteVacinal { get; set; }
        public DateTime ValidadeImunizante { get; set; }
        public string Veterinario { get; set; }
    }

    public class PetWithVaccinesDto
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Especie { get; set; }
        public string Raca { get; set; }
        public DateTime DataNascimento { get; set; }
        public string FotoUrl { get; set; }
        public char Sexo { get; set; }
        public decimal? Peso { get; set; }
        public string? Observacoes { get; set; }
        public List<VaccineRecordDto> Vacinas { get; set; } = new List<VaccineRecordDto>();
    }
}