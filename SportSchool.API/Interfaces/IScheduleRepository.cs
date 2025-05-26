using Microsoft.AspNetCore.Mvc;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;

namespace SportSchool.API.Interfaces
{
    public interface IScheduleRepository
    {

        Task<IEnumerable<ClassSessionDto>> GetWeeklySchedule(/*DateTime? startDate*/);

    }
}
