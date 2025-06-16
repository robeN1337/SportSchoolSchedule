using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportSchool.API.Data;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;
using System.Collections;

namespace SportSchool.API.Repositories
{
    public class ClassSessionsRepository : IClassSessionsRepository
    {

        private readonly ILogger<ClassSessionsRepository> _logger;
        private readonly SportSchoolDbPostgreContext _context;
        public ClassSessionsRepository(SportSchoolDbPostgreContext context, ILogger<ClassSessionsRepository> logger)
        {
            _logger = logger;
            _context = context;

        }

        public ClassSession CreateClassSession(CreateClassSessionDto sessionDto)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Groupid == sessionDto.GroupId);
            if (group == null)
                throw new Exception("Группа с таким id не найдена.");

            var session = new ClassSession
            {
                ClassName = sessionDto.ClassName,
                Date = DateOnly.Parse(sessionDto.Date),
                StartTime = TimeOnly.Parse(sessionDto.StartTime),
                EndTime = TimeOnly.Parse(sessionDto.EndTime),
                Groupid = sessionDto.GroupId
            };

            _context.ClassSessions.Add(session);
            _context.SaveChanges();

            return session;

        }


    }
}
