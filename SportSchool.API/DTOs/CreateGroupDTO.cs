using SportSchool.API.Entities;

namespace SportSchool.API.DTOs
{
    public class CreateGroupDto
    {

        public string Groupname { get; set; } = null!;
        public string? Level { get; set; }
        public string? Status { get; set; }

        public int Coachid { get; set; }
    

    }

}
