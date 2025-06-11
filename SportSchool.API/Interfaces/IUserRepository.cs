using Microsoft.AspNetCore.Mvc;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;

namespace SportSchool.API.Interfaces
{
    public interface IUserRepository
    {
        User CreateUser(User user);
        List<User> GetUsers();
        User GetUserById(Guid id);
        User GetUserByEmailAndPassword(string email, string password);
        User EditUser(User user, Guid id);
        bool DeleteUser(Guid id);

        Task<UserProfileDto?> GetUserProfileAsync(Guid userGuid);


    }
}
