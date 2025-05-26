using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportSchool.API.Data;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;
using System.Collections;

namespace SportSchool.API.Repositories
{
    public class ScheduleRepository : IScheduleRepository
    {

        private readonly ILogger<ScheduleRepository> _logger;
        private readonly SportSchoolDbPostgreContext _context;
        public ScheduleRepository(SportSchoolDbPostgreContext context, ILogger<ScheduleRepository> logger)
        {
            _logger = logger;
            _context = context;

        }

        public async Task<IEnumerable<ClassSessionDto>> GetWeeklySchedule(/*DateTime? startDate*/)  // через апи не получается сделать диапазон. пойдём через фронт
        {
            /*DateTime start = startDate?.Date ?? DateTime.Today;
            int diff = (7 + (start.DayOfWeek - DayOfWeek.Monday)) % 7;
            start = start.AddDays(-diff);
            DateTime end = start.AddDays(6);*/

            var sessions = await _context.ClassSessions
                .Include(cs => cs.Group)
                    .ThenInclude(g => g.Coach)
                .Include(cs => cs.Group)
                    .ThenInclude(g => g.Athletes)
                /*.Where(cs => cs.Date >= DateOnly.FromDateTime(start) && cs.Date <= DateOnly.FromDateTime(end))*/
                .OrderBy(cs => cs.Date)
                .ThenBy(cs => cs.StartTime)
                .ToListAsync();
            

            return sessions.Select(cs => new ClassSessionDto
            {
                Id = cs.Id,
                ClassName = cs.ClassName,
                Date = cs.Date,
                StartTime = cs.StartTime,
                EndTime = cs.EndTime,
                Group = new GroupDto
                {
                    Groupid = cs.Group.Groupid,
                    Groupname = cs.Group.Groupname,
                    Level = cs.Group.Level,
                    Status = cs.Group.Status,
                    Coach = cs.Group.Coach == null ? null : new CoachDto
                    {
                        Coachid = cs.Group.Coach.Coachid,
                        Fullname = cs.Group.Coach.Fullname,
                        Phone = cs.Group.Coach.Phone,
                        Email = cs.Group.Coach.Email
                    },

                }
            }) ;
        }


    }
}
