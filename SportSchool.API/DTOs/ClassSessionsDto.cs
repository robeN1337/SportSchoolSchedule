namespace SportSchool.API.DTOs
{
    public class ClassSessionDto
    {
        public int Id { get; set; }

        public string ClassName { get; set; }
        public DateOnly Date { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }

        public GroupDto Group { get; set; } = null!;
    }

}
