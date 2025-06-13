using Microsoft.AspNetCore.Mvc;
using PetControl.DTOs;
using PetControl.Models;
using PetControl.Services;

namespace PetControl.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase // Renamed from LoginController
    {
        private readonly ILogger<AuthController> _logger;
        private readonly UserService _userServices;

        public AuthController(ILogger<AuthController> logger, UserService userService)
        {
            _logger = logger;
            _userServices = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> UserLogin([FromBody] UserLoginDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Email) || string.IsNullOrEmpty(userDto.Password))
            {
                return BadRequest(new { error = "Email e senha são obrigatórios." });
            }

            var userLogin = await _userServices.AuthenticateUserAsync(userDto.Email.ToLower(), userDto.Password);

            if (userLogin != null)
            {
                // SET SESSION HERE!
                HttpContext.Session.SetString("UserId", userLogin.Id.ToString());

                return Ok(new { message = "Login realizado com sucesso!", user = userLogin });
            }
            else
            {
                return Unauthorized(new { error = "Credenciais inválidas." });
            }
        }

        [HttpPost("register")]
        public IActionResult CreateUser([FromBody] CreateUserDto userDto)
        {
            if (string.IsNullOrEmpty(userDto.Name) ||
                string.IsNullOrEmpty(userDto.Email) ||
                string.IsNullOrEmpty(userDto.Password))
            {
                return BadRequest(new { error = "Nome, email e senha são obrigatórios." });
            }

            if (_userServices.UserExists(userDto.Email))
            {
                return Conflict(new { error = "Usuário já registrado com este email." });
            }

            var user = new User(userDto.Name, userDto.Password, userDto.Email);
            _userServices.CreateUser(user);
            return Ok(new { message = "Usuário registrado com sucesso!" });
        }
    }
}