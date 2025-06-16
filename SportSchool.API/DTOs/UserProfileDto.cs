namespace SportSchool.API.DTOs
{
    public class UserProfileDto
    {
        public Guid UserGuid { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; } = string.Empty;

        public int? GroupId { get; set; }
        public string? GroupName { get; set; }

    }

}
