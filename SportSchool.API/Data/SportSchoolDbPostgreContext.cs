using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SportSchool.API.Entities;

namespace SportSchool.API.Data;

public partial class SportSchoolDbPostgreContext : DbContext
{

    private readonly IConfiguration _configuration;
    private readonly ILogger _logger;

    public SportSchoolDbPostgreContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public SportSchoolDbPostgreContext(DbContextOptions<SportSchoolDbPostgreContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Athlete> Athletes { get; set; }

    public virtual DbSet<Coach> Coaches { get; set; }

    public virtual DbSet<Group> Groups { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<ClassSession> ClassSessions { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    { 
        var connectionString = _configuration.GetConnectionString("PostgresConnection");
        optionsBuilder.UseNpgsql(connectionString); 
    }
        

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Athlete>(entity =>
        {
            entity.HasKey(e => e.Athleteid).HasName("athletes_pkey");

            entity.ToTable("athletes");

            entity.Property(e => e.Athleteid).HasColumnName("athleteid");
            entity.Property(e => e.Birthdate).HasColumnName("birthdate");
            entity.Property(e => e.Contact)
                .HasMaxLength(100)
                .HasColumnName("contact");
            entity.Property(e => e.Fullname)
                .HasMaxLength(100)
                .HasColumnName("fullname");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .HasColumnName("gender");
            entity.Property(e => e.Groupid).HasColumnName("groupid");

            entity.HasOne(d => d.Group).WithMany(p => p.Athletes)
                .HasForeignKey(d => d.Groupid)
                .HasConstraintName("athletes_groupid_fkey");
        });

        modelBuilder.Entity<Coach>(entity =>
        {
            entity.HasKey(e => e.Coachid).HasName("coaches_pkey");

            entity.ToTable("coaches");

            entity.Property(e => e.Coachid).HasColumnName("coachid");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Fullname)
                .HasMaxLength(100)
                .HasColumnName("fullname");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
        });

        modelBuilder.Entity<Group>(entity =>
        {
            entity.HasKey(e => e.Groupid).HasName("groups_pkey");

            entity.ToTable("groups");

            entity.Property(e => e.Groupid).HasColumnName("groupid");
            entity.Property(e => e.Coachid).HasColumnName("coachid");
            entity.Property(e => e.Groupname)
                .HasMaxLength(100)
                .HasColumnName("groupname");
            entity.Property(e => e.Level)
                .HasMaxLength(50)
                .HasColumnName("level");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .HasColumnName("status");

            entity.HasOne(d => d.Coach).WithMany(p => p.Groups)
                .HasForeignKey(d => d.Coachid)
                .HasConstraintName("groups_coachid_fkey");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserGuid).HasName("users_pkey");

            entity.ToTable("users");

            entity.Property(e => e.UserGuid)
                .ValueGeneratedNever()
                .HasColumnName("user_guid");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Username).HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
