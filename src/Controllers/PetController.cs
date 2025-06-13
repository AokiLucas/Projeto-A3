using Microsoft.AspNetCore.Mvc;
using PetControl.Models;
using PetControl.Services;
using PetControl.DTOs;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class PetController : ControllerBase
{
    private readonly PetService _petService;
    private readonly VacinaService _vacinaService;

    public PetController(PetService petService, VacinaService vacinaService)
    {
        _petService = petService;
        _vacinaService = vacinaService;
    }

    [HttpPost]
    public async Task<IActionResult> RegisterPet([FromBody] PetWithVaccinesDto petDto)
    {
        var userIdStr = HttpContext.Session.GetString("UserId");
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            return Unauthorized();

        var pet = new Pet(
            petDto.Nome,
            petDto.Especie,
            petDto.Raca,
            petDto.DataNascimento,
            petDto.FotoUrl,
            userId,
            petDto.Sexo,
            petDto.Peso,
            petDto.Observacoes
        );

        _petService.CreatePet(pet);
        return Ok(new { message = "Pet cadastrado com sucesso!" });
    }

    [HttpGet("with-vaccines")]
    public async Task<IActionResult> GetPetsWithVaccines()
    {
        var userIdStr = HttpContext.Session.GetString("UserId");
        if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
            return Unauthorized();

        var pets = await _petService.GetAllPets(userId);
        var now = DateTime.Now.Date;

        var result = pets.Select(p =>
        {
            var upcomingVaccines = (p.VaccineRecords ?? new List<RegistroVacina>())
                .Where(v => v.DataAplicacao.Date > now)
                .Select(v => new
                {
                    id = v.Id,
                    name = v.NomeVacina,
                    lot = v.LoteVacinal,
                    applicationDate = v.DataAplicacao.ToString("dd/MM/yyyy"),
                    expireDate = v.ValidadeImunizante.ToString("dd/MM/yyyy"),
                    veterinario = v.Veterinario
                })
                .ToList();

            var vaccineHistory = (p.VaccineRecords ?? new List<RegistroVacina>())
                .Where(v => v.DataAplicacao.Date <= now)
                .OrderByDescending(v => v.DataAplicacao)
                .Select(v => new
                {
                    id = v.Id,
                    name = v.NomeVacina,
                    lot = v.LoteVacinal,
                    applicationDate = v.DataAplicacao.ToString("dd/MM/yyyy"),
                    expireDate = v.ValidadeImunizante.ToString("dd/MM/yyyy"),
                    veterinario = v.Veterinario
                })
                .ToList();

            var vacinas = (p.VaccineRecords ?? new List<RegistroVacina>())
                .Select(v => new
                {
                    id = v.Id,
                    name = v.NomeVacina,
                    lot = v.LoteVacinal,
                    applicationDate = v.DataAplicacao.ToString("dd/MM/yyyy"),
                    expireDate = v.ValidadeImunizante.ToString("dd/MM/yyyy"),
                    veterinario = v.Veterinario
                })
                .ToList();

            return new
            {
                id = p.Id,
                nome = p.Nome,
                especie = p.Especie,
                raca = p.Raca,
                dataNascimento = p.DataNascimento.ToString("dd/MM/yyyy"),
                fotoUrl = p.FotoUrl,
                sexo = p.Sexo == 'M' ? "Macho" : "Fêmea",
                peso = p.Peso,
                observacoes = p.Observacoes,
                vacinas,
                upcomingVaccines,
                vaccineHistory
            };
        }).ToList();

        return Ok(result);
    }

    [HttpPost("{petId}/vaccine")]
    public async Task<IActionResult> RegisterVaccine(Guid petId, [FromBody] RegisterVaccineDto vaccineDto)
    {
        try
        {
            var userIdStr = HttpContext.Session.GetString("UserId");
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
                return Unauthorized();

            if (vaccineDto == null ||
                string.IsNullOrWhiteSpace(vaccineDto.Name) ||
                string.IsNullOrWhiteSpace(vaccineDto.Lot) ||
                string.IsNullOrWhiteSpace(vaccineDto.Veterinario) ||
                string.IsNullOrWhiteSpace(vaccineDto.ApplicationDate) ||
                string.IsNullOrWhiteSpace(vaccineDto.ExpireDate))
            {
                return BadRequest("Todos os campos são obrigatórios.");
            }

            if (!DateTime.TryParse(vaccineDto.ApplicationDate, out var dataAplicacao) ||
                !DateTime.TryParse(vaccineDto.ExpireDate, out var validadeImunizante))
            {
                return BadRequest("Datas inválidas.");
            }
            if (dataAplicacao.Year < 2000 || validadeImunizante.Year < 2000)
            {
                return BadRequest("Preencha as datas corretamente.");
            }

            var pet = await _petService.GetPet(petId);
            if (pet == null) return NotFound();

            var vacina = new RegistroVacina(
                vaccineDto.Name,
                dataAplicacao,
                vaccineDto.Lot,
                validadeImunizante,
                vaccineDto.Veterinario,
                petId
            );

            _vacinaService.CreateVacina(vacina);

            return Ok(new { message = "Vacina registrada com sucesso!" });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Erro ao registrar vacina: " + ex.ToString());
            return StatusCode(500, "Erro interno: " + ex.Message);
        }
    }
}