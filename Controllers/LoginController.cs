using Microsoft.AspNetCore.Mvc;
using PetControl.Services;

namespace PetControl.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly UserService _userServices;

        public LoginController(ILogger<HomeController> logger, UserService userService)
        {
            _logger = logger;
            _userServices = userService;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> UserLogin(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest(new { message = "Email and password are required." });
            }

            var userLogin = await _userServices.AuthenticateUserAsync(email, password);

            if (userLogin != null)
            {
                HttpContext.Session.SetString("UserId", userLogin.Id.ToString());
                HttpContext.Session.SetString("UserEmail", userLogin.Email);

                return Ok(new { message = "Login bem-sucedido!" });
            }
            else
            {
                return Unauthorized(new { message = "Invalid Credentials." });
            }
        }
    }
}
