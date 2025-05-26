namespace SportSchool.API.DTOs
{
    public class GroupDto
    {
        public int Groupid { get; set; }
        public string Groupname { get; set; } = null!;
        public string? Level { get; set; }
        public string? Status { get; set; }

        public CoachDto? Coach { get; set; }

        // Список только имён спортсменов
    }

}
