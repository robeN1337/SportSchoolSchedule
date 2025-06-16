namespace SportSchool.API.DTOs
{
    public class CreateClassSessionDto
    {
        public string ClassName { get; set; } = string.Empty;
        public string Date { get; set; }           // строка "2025-06-25"
        public string StartTime { get; set; }      // строка "12:00"
        public string EndTime { get; set; }        // строка "13:00"
        public int GroupId { get; set; }
    }

}
