namespace SportSchool.API.DTOs
{
    public class AthleteDto
    {
        public int Athleteid { get; set; }
        public string Fullname { get; set; } = null!;
        public DateOnly Birthdate { get; set; }
        public string? Gender { get; set; }
        public string? Contact { get; set; }
        public int? Groupid { get; set; }
        public string? Groupname { get; set; } 
    }
}
