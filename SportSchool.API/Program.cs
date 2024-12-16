
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SportSchool.API.Data;
using SportSchool.API.Entities;
using static System.Net.Mime.MediaTypeNames;
using System;
using SportSchool.API.Interfaces;
using SportSchool.API.Repositories;

namespace SportSchool.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.


            builder.Services.AddControllers();
            builder.Services.AddScoped<SportSchoolScheduleDBContext>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            //string connstring = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<SportSchoolScheduleDBContext>(o => o.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=SportSchoolScheduleDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False"));
            builder.Services.AddSwaggerGen();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.MapControllers();

            app.Run();
        }
    }
}
