using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SportSchool.API.Entities;

public partial class User
{
    [Key]
    public Guid UserGuid { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;
}
