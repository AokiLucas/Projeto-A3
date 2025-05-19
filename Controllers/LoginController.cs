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
        public async Task<IActionResult> UserLogin([FromBody] UserLoginDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Email) || string.IsNullOrEmpty(userDto.Password))
            {
                return BadRequest(new { message = "Email e senha são obrigatórios." });
            }

            var userLogin = await _userServices.AuthenticateUserAsync(userDto.Email, userDto.Password);

            if (userLogin != null)
            {
                HttpContext.Session.SetString("UserId", userLogin.Id.ToString());
                HttpContext.Session.SetString("UserEmail", userLogin.Email);

                return Ok(new { message = "Login bem-sucedido!" });
            }
            else
            {
                return Unauthorized(new { message = "Credenciais inválidas." });
            }
        }


        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserDto userDto)
        {

            if (userDto == null)
            {
                return BadRequest("User cannot be null.");
            }


            var user = new User(userDto.Name, userDto.Password, userDto.Email);

            try
            {
                _userServices.CreateUser(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


            return Ok();

        }


    }
}
