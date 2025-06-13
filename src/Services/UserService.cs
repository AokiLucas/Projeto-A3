using PetControl.Models;
using PetControl.Repositories;

namespace PetControl.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository usuarioRepository)
        {
            _userRepository = usuarioRepository;
        }

        public void CreateUser(User user)
        {
            user.Password = PasswordCriptografyService.GeneratePasswordHash(user.Password);
            _userRepository.Add(user);
        }

        public async Task<User?> AuthenticateUserAsync(string userEmail, string userPassword)
        {
            var user = await _userRepository.getLoginAsync(userEmail);

            if (user != null && PasswordCriptografyService.ValidPassword(userPassword, user.Password))
            {
                return user;
            }

            return null;
        }

        public User GetUser(string email)
        {
            return _userRepository.getLoginAsync(email).Result;
        }

        public bool UserExists(string email)
        {
            var user = _userRepository.getLoginAsync(email).Result;
            return user != null;
        }
    }
}
