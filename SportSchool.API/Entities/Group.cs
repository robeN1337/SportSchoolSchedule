using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SportSchool.API.Entities;

public partial class Group
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Groupid { get; set; }

    public string Groupname { get; set; } = null!;
    public string? Level { get; set; }
    public string? Status { get; set; }

    public int? Coachid { get; set; }
    public virtual ICollection<Athlete> Athletes { get; set; } = new List<Athlete>();

    public virtual Coach? Coach { get; set; }
}
