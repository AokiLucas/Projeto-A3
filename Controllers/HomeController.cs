using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PetControl.Models;
using PetControl.Services;

namespace PetControl.Controllers
{
    public class HomeController : Controller
    {

        private readonly ILogger<HomeController> _logger;
        private readonly PetService _petServices;
        private readonly VacinaService _vacinaService;

        public HomeController(ILogger<HomeController> logger, PetService petService, VacinaService vacinaService)
        {
            _logger = logger;
            _petServices = petService;
            _vacinaService = vacinaService;
        }
        public IActionResult Index()
        {

            var userId = HttpContext.Session.GetString("UserId");


            ChecarPetsUsuario();

            var vacinas = _vacinaService.ObterVacinasComPet(Guid.Parse(userId));
            
            ViewBag.TodasVacinas = vacinas;

            return View();
        }




        public void ChecarPetsUsuario()
        {
            var userID = HttpContext.Session.GetString("UserId");

            if (Guid.TryParse(userID, out var id))
            {
                var pets = _petServices.GetAllPets(id).Result;

                ViewBag.Pets = pets.Count == 0 ? null : pets;
            }
            else
            {
                ViewBag.Pets = null;
            }
        }
    }
}
