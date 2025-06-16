using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportSchool.API.Data;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;
using System.Collections;

namespace SportSchool.API.Repositories
{
    public class GroupRepository : IGroupRepository
    {

        private readonly ILogger<GroupRepository> _logger;
        private readonly SportSchoolDbPostgreContext _context;
        public GroupRepository(SportSchoolDbPostgreContext context, ILogger<GroupRepository> logger)
        {
            _logger = logger;
            _context = context;

        }

        public async Task<IEnumerable<GroupDto>> GetGroups() 
        {

/*            var sessions = await _context.ClassSessions
                .Include(cs => cs.Group)
                    .ThenInclude(g => g.Coach)
                .Include(cs => cs.Group)
                    .ThenInclude(g => g.Athletes)
                .OrderBy(cs => cs.Date)
                .ThenBy(cs => cs.StartTime)
                .ToListAsync();*/

            var groups = await _context.Groups
                .Include(g => g.Coach)
                .ToListAsync();


            return groups.Select(cs => new GroupDto
            {
                Groupid = cs.Groupid,
                Groupname = cs.Groupname,
                Level = cs.Level,
                Status = cs.Status,
                Coach = cs.Coach == null ? null : new CoachDto
                {
                            Coachid = (int)cs.Coachid,
                            Fullname = cs.Coach.Fullname,
                            Email = cs.Coach.Email,
                            Phone = cs.Coach.Phone
                }

            });
        }

        public Group CreateGroup(CreateGroupDto groupdata)
        {
            var coach = _context.Coaches.FirstOrDefault(c => c.Coachid == groupdata.Coachid);

            if (coach == null)
            {
                throw new Exception("Тренер с таким ID не найден");
            }
                
            

            var newGroup = new Group
            {
                Groupname = groupdata.Groupname,
                Level = groupdata.Level,
                Status = groupdata.Status,
                Coach = coach,      // присваиваем объект Coach
                Athletes = new List<Athlete>()
            };

            _context.Groups.Add(newGroup);
            _context.SaveChanges();

            return newGroup;
        }

        public Group GetGroupById(int groupid)
        {
            var group = _context.Groups
                .Include(g => g.Athletes)    // подгружаем атлетов
                .Include(g => g.Coach)
                .FirstOrDefault(g => g.Groupid == groupid);
            return group;
        }

        public bool DeleteGroup (int groupid)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Groupid == groupid);

            if (group != null)
            {
                var resultremove = _context.Groups.Remove(group);
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
    }
}
