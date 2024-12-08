using Microsoft.EntityFrameworkCore;
using SportSchool.API.Data;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;

namespace SportSchool.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SportSchoolScheduleDBContext _context;
        public UserRepository(SportSchoolScheduleDBContext context) {

            _context = context;

            }
        public User CreateUser(User user)
        {
            var result = new User();
            result.User_Guid = Guid.NewGuid();
            result.UserName = user.UserName;
            result.Email = user.Email;
            result.Password = user.Password;
            _context.Add(result);
            _context.SaveChanges();
            return result;
        }

        public bool DeleteUser(Guid id)
        {

            var user = _context.Users.FirstOrDefault(u => u.User_Guid == id);
            if (user != null)
            {
                var resultremove = _context.Users.Remove(user);
                if (resultremove != null)
                {
                    _context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
            
        }

        public User EditUser(User user, Guid id)
        {
            throw new NotImplementedException();
        }

        public User GetUserById(Guid id)
        {
            var result = _context.Users.FirstOrDefault(u => u.User_Guid == id);
            return result;
        }

        public List<User> GetUsers()
        {
            var result = _context.Users.ToList();
            return result;
        }

    }
}
