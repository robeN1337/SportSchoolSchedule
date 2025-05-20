using System;
using System.Collections.Generic;

namespace SportSchool.API.Entities;

public partial class Coach
{
    public int Coachid { get; set; }

    public string Fullname { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<Group> Groups { get; set; } = new List<Group>();
}
