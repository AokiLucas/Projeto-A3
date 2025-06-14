﻿using Microsoft.EntityFrameworkCore;
using PetControl.Data;
using PetControl.Models;
using System;

namespace PetControl.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context) { _context = context; }

        public void Add(User user)
        {
            _context.Add(user);
            _context.SaveChanges();
        }

        public async Task<User?> getLoginAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}
