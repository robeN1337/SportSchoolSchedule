using Microsoft.AspNetCore.Mvc;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;
using SportSchool.API.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SportSchool.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class GroupController : ControllerBase
    {

        private readonly IGroupRepository _repo;

        public GroupController(IGroupRepository repo)
        {
            _repo = repo;
        }


        [HttpGet("getGroups")]
         public async Task<IEnumerable<GroupDto>> GetAllGroups()
        {
            return await _repo.GetGroups();
        }

        // GET api/<GroupController>/5
        [HttpGet("getGroupById")]
        public async Task<ActionResult<Group>> GetGroupById(int groupid)
        {
            return Ok(_repo.GetGroupById(groupid));
        }

        // POST api/<GroupController>
        [HttpPost("newGroup")]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupDto groupdata)
        {
            var result = _repo.CreateGroup(groupdata);
            return Ok(result);
        }

        // PUT api/<GroupController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GroupController>/5
        [HttpDelete("deleteGroup")]
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
        }
    }
}
