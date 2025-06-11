using System;
using System.Collections.Generic;

namespace SportSchool.API.Entities;

public partial class Athlete
{
    public int Athleteid { get; set; }

    public string Fullname { get; set; } = null!;

    public DateOnly Birthdate { get; set; }

    public string? Gender { get; set; }

    public int? Groupid { get; set; }

    public string? Contact { get; set; }

    public virtual Group? Group { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; }
}
