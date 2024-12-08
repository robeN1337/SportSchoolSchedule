using Microsoft.EntityFrameworkCore;
using SportSchool.API.Entities;

namespace SportSchool.API.Data
{
    public class SportSchoolScheduleDBContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public SportSchoolScheduleDBContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {
            Database.EnsureCreated();
        }

        
    }
}
