using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportSchool.API.Data;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;
using SportSchool.API.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SportSchool.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClassSessionsController : ControllerBase
    {

        private readonly IClassSessionsRepository _repo;
        private readonly SportSchoolDbPostgreContext _context;

        public ClassSessionsController(IClassSessionsRepository repo, SportSchoolDbPostgreContext context)
        {
            _repo = repo;
            _context = context;
        }


        /*[HttpPost("newClassSession")]
        public async Task<ActionResult<ClassSession>> CreateClassSession ([FromBody] CreateClassSessionDto sessiondata)
        {
            var result = _repo.CreateClassSession(sessiondata);
            return Ok(result);
        }*/


        [HttpPost("createClassSession")]
        public IActionResult CreateSession([FromBody] CreateClassSessionDto sessionDto)
        {
            var group = _context.Groups.FirstOrDefault(g => g.Groupid == sessionDto.GroupId);
            if (group == null)
                return NotFound("Указанная группа не найдена.");

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

            return Ok(session);
        }

        [HttpPut("updateClassSession")]
        public IActionResult UpdateSession(int id, [FromBody] CreateClassSessionDto sessionDto)
        {
            var session = _context.ClassSessions.FirstOrDefault(s => s.Id == id);
            if (session == null)
                return NotFound("Занятие не найдено.");

            var group = _context.Groups.FirstOrDefault(g => g.Groupid == sessionDto.GroupId);
            if (group == null)
                return NotFound("Указанная группа не найдена.");

            session.ClassName = sessionDto.ClassName;
            session.Date = DateOnly.Parse(sessionDto.Date);
            session.StartTime = TimeOnly.Parse(sessionDto.StartTime);
            session.EndTime = TimeOnly.Parse(sessionDto.EndTime);
            session.Groupid = sessionDto.GroupId;

            _context.SaveChanges();

            return Ok(session);
        }

        [HttpGet("getClassSessions")]
        public async Task<ActionResult<IEnumerable<ClassSession>>> GetAllClassSessions()
        {
            var sessions = await _context.ClassSessions
                .Include(cs => cs.Group)
                .ToListAsync();

            return Ok(sessions);
        }

        [HttpGet("getClassSessionById")]
        public async Task<IActionResult> GetClassSessionById(int id)
        {
            var session = await _context.ClassSessions
                .Include(cs => cs.Group)
                .FirstOrDefaultAsync(cs => cs.Id == id);

            if (session == null)
                return NotFound(new { message = $"Занятие с id = {id} не найдено" });

            return Ok(session);
        }

        [HttpDelete("deleteClassSessionById")]
        public async Task<IActionResult> DeleteClassSession(int id)
        {
            var session = await _context.ClassSessions.FindAsync(id);
            if (session == null)
                return NotFound(new { message = $"Занятие с id = {id} не найдено" });

            _context.ClassSessions.Remove(session);
            await _context.SaveChangesAsync();

            return Ok($"Занятие с id {id} ({session.ClassName}) успешно удалено."); ;
        }

        /*[HttpDelete("deleteGroup")]
        public async Task<ActionResult<bool>> DeleteGroup(int groupid)
        {
            var result = _repo.DeleteGroup(groupid);
            if (result == false)
            {
                return BadRequest("(API DeleteGroup - Ошибка удаления группы.)");
            }
            else
            {
                return Ok($"(API DeleteGroup - Группа {groupid} удалена!)");
            }
        }*/
    }
}
