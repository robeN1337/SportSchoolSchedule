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
            
            var finduser = _context.Users.FirstOrDefault(u => u.User_Guid == id);
            if(finduser != null)
            {
                finduser.UserName = user.UserName;
                finduser.Email = user.Email;
                finduser.Password = user.Password;
                _context.Update(finduser);
                _context.SaveChanges();
                return finduser;
            }
            else { return null; }  
            
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

        public User GetUserByEmailAndPassword(string email, string password)
        {
            var result = _context.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
            return result;
        }

    }
}
