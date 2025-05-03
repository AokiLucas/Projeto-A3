using PetControl.Models;
using System;

namespace PetControl.Repositories
{
    public interface IUserRepository
    {
        void Add(User user);

        Task<User> getLoginAsync(string email);
    }
}
