using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PetControl.DTOs;
using PetControl.Models;
using PetControl.Services;

namespace PetControl.Controllers
{
    public class VacinaController : Controller
    {

        private readonly ILogger<VacinaController> _logger;
        private readonly VacinaService _vacinaServices;
        private readonly PetService _petServices;

        public VacinaController(ILogger<VacinaController> logger, VacinaService vacinaService, PetService petService)
        {
            _logger = logger;
            _vacinaServices = vacinaService;
            _petServices = petService;
        }

        public IActionResult Cadastro()
        {
            var pets = _petServices.GetAllPets(Guid.Parse(HttpContext.Session.GetString("UserId"))).Result;
            ViewBag.PetID = pets.Select(_ => new SelectListItem
            {
                Value = _.Id.ToString(),
                Text = _.Nome
            });

            return View("CadastroVacina");
        }

        public IActionResult DetalheVacina(Guid id)
        {
            var vacina = _vacinaServices.getVacina(id);

            if (vacina == null)
            {
                return NotFound();
            }

            ViewBag.NomePet = vacina.Pet?.Nome;

            return View(vacina);
        }

        public async Task<IActionResult> CreateVacina(CreateRegistroVacinaDto vacinaDto)
        {
            _vacinaServices.CreateVacina(new RegistroVacina(
                vacinaDto.NomeVacina,
                vacinaDto.DataAplicacao,
                vacinaDto.LoteVacinal,
                vacinaDto.ValidadeImunizante,
                vacinaDto.Veterinario,
                Guid.Parse(vacinaDto.PetID)
            ));
            TempData["Sucesso"] = "Vacina cadastrada com sucesso!";
            return RedirectToAction("Index", "Home");

        }


        public async Task<IActionResult> AtualizarVacina(UpdateVacinaDto vacinaDto)
        {
            _vacinaServices.AtualizarVacinaComDadosParciais(vacinaDto);
            TempData["Sucesso"] = "Pet atualizado com sucesso!";
            return RedirectToAction("Index", "Home");
        }


        public IActionResult DeletarVacina(Guid id)
        {
            _vacinaServices.DeleteVacina(id);
            TempData["Sucesso"] = "Vacina excluida com sucesso!";
            return RedirectToAction("Index", "Home");

        }
        
    }
}
