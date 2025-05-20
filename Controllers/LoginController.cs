using Microsoft.AspNetCore.Mvc;
using PetControl.DTOs;
using PetControl.Models;
using PetControl.Services;

namespace PetControl.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<LoginController> _logger;
        private readonly UserService _userServices;

        public LoginController(ILogger<LoginController> logger, UserService userService)
        {
            _logger = logger;
            _userServices = userService;
        }

        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> UserLogin(UserLoginDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Email) || string.IsNullOrEmpty(userDto.Password))
            {
                TempData["Erro"] = "Email e senha são obrigatórios.";
                return RedirectToAction("Login");
            }

            var userLogin = await _userServices.AuthenticateUserAsync(userDto.Email.ToLower(), userDto.Password);

            if (userLogin != null)
            {
                HttpContext.Session.SetString("UserId", userLogin.Id.ToString());
                HttpContext.Session.SetString("UserEmail", userLogin.Email);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                TempData["Erro"] = "Credenciais inválidas.";
                return RedirectToAction("Login");
            }
        }

        [HttpPost]
        public IActionResult CreateUser(CreateUserDto userDto, string confirmPassword)
        {
            if (userDto.Password != confirmPassword)
            {
                TempData["Erro"] = "As senhas não coincidem.";
                return RedirectToAction("Login");
            }

            try
            {
                var user = new User(userDto.Name, userDto.Password, userDto.Email);
                _userServices.CreateUser(user);
                TempData["Sucesso"] = "Usuário registrado com sucesso!";
            }
            catch (Exception ex)
            {
                TempData["Erro"] = ex.Message;
            }

            return RedirectToAction("Login");
        }
    }
}
