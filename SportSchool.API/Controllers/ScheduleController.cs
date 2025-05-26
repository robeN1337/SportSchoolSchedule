using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SportSchool.API.Data;
using SportSchool.API.Entities;
using SportSchool.API.Interfaces;

namespace SportSchool.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleRepository _repo;

        public ScheduleController(IScheduleRepository repo)
        {
            _repo = repo;
        }


        [HttpGet("getweeklyschedule")]
        public async Task<IActionResult> GetWeeklySchedule(/*DateTime? startDate*/)
        {
            var schedule = await _repo.GetWeeklySchedule();
            return Ok(schedule);
        }

    }
}
