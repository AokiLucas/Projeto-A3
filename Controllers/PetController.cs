using Microsoft.AspNetCore.Mvc;
using PetControl.DTOs;
using PetControl.Models;
using PetControl.Services;

namespace PetControl.Controllers
{
    public class PetController : Controller
    {

        private readonly ILogger<PetController> _logger;
        private readonly PetService _petService;

        public PetController(ILogger<PetController> logger, PetService petService)
        {
            _logger = logger;
            _petService = petService;
        }


        public IActionResult PetMenu()
        {

            var pets = _petService.GetAllPets(Guid.Parse(HttpContext.Session.GetString("UserId"))).Result;
            return View(pets);
        }


        public IActionResult Cadastro()
        {
            return View("PetCadastro");
        }

        public IActionResult PetDetalhe(Guid id)
        {

            var pet = _petService.GetPet(id).Result;

            if (pet == null)
            {
                return NotFound();
            }

            var model = new UpdatePetDto
            {
                Id = id,
                Nome = pet.Nome,
                Especie = pet.Especie,
                Raca = pet.Raca,
                DataNascimento = pet.DataNascimento,
                Sexo = pet.Sexo,
                Peso = pet.Peso,
                Observacoes = pet.Observacoes,
                FotoUrl = pet.FotoUrl
            };

            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePet(CreatePetDto petDto)
        {
            var userID = HttpContext.Session.GetString("UserId");
            var pet = new Pet(petDto.Name,
                petDto.Especie,
                petDto.Raca,
                petDto.DataNascimento,
                _petService.SalvarImagemPet(petDto.FotoPet),
                Guid.Parse(userID),
                petDto.Sexo,
                petDto.Peso,
                petDto.Observacoes);


            _petService.CreatePet(pet);
            TempData["Sucesso"] = "Pet cadastrado com sucesso!";
            return RedirectToAction("Index", "Home");

        }

        public IActionResult UpdatePet(UpdatePetDto petDto)
        {
            _petService.AtualizarPetComDadosParciais(petDto);
            TempData["Sucesso"] = "Pet atualizado com sucesso!";
            return RedirectToAction("PetMenu");
        }

        public IActionResult DeletePet(Guid id)
        {
            _petService.DeletePet(id);
            TempData["Sucesso"] = "Pet excluído com sucesso!";
            return RedirectToAction("PetMenu");

        }
    }
}