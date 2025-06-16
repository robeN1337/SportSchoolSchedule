using Microsoft.AspNetCore.Mvc;
using SportSchool.API.DTOs;
using SportSchool.API.Entities;

namespace SportSchool.API.Interfaces
{
    public interface IGroupRepository
    {

        Task<IEnumerable<GroupDto>> GetGroups();
        Group CreateGroup(CreateGroupDto groupdata);
        Group GetGroupById(int groupid);
        bool DeleteGroup (int groupid);
    }
}
