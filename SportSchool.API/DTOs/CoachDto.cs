namespace SportSchool.API.DTOs
{
    public class CoachDto
    {
        public int Coachid { get; set; }
        public string Fullname { get; set; } = null!;
        public string? Phone { get; set; }
        public string? Email { get; set; }
    }

}
