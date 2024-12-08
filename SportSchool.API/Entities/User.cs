using System.ComponentModel.DataAnnotations;

namespace SportSchool.API.Entities
{
    public class User
    {
        [Key]
        public Guid User_Guid { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }
    }
}
