using SportSchool.API.Entities;

namespace SportSchool.API.Interfaces
{
    public interface IUserRepository
    {
        User CreateUser(User user);
        List<User> GetUsers();
        User GetUserById(Guid id);
        User EditUser(User user, Guid id);
        bool DeleteUser(Guid id);


    }
}
