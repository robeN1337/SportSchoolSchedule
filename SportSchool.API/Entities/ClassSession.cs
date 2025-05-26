namespace SportSchool.API.Entities
{
    public partial class ClassSession
    {
        public int Id { get; set; }

        public string? ClassName { get; set; }

        public DateOnly Date { get; set; }

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }

        public int Groupid { get; set; }

        public virtual Group Group { get; set; } = null!;
    }
}
