
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SportSchool.API.Data;
using SportSchool.API.Entities;
using static System.Net.Mime.MediaTypeNames;
using System;
using SportSchool.API.Interfaces;
using SportSchool.API.Repositories;
using System.Configuration;
using System.Text.Json.Serialization;


namespace SportSchool.API
{
    public class Program
    {
        private readonly IConfiguration _configuration;

        
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            


            builder.Services.AddControllers()
                .AddJsonOptions(opts =>
                {
                    // .IgnoreCycles пропустит повторные ссылки, не выбрасывая ошибки
                    opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

                    // Если хочешь сохранять ссылки и выдавать $id/$ref, можно вместо этого использовать:
                    // opts.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                }); ;
            builder.Services.AddScoped<SportSchoolDbPostgreContext>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IClassSessionsRepository, ClassSessionsRepository>();
            builder.Services.AddScoped<IScheduleRepository, ScheduleRepository>();
            builder.Services.AddScoped<IGroupRepository, GroupRepository>();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();
            string connstring = builder.Configuration.GetConnectionString("PostgresConnection");
            /*builder.Services.AddDbContext<SportSchoolScheduleDBContext>(o => o.UseSqlServer(@"Data Source=(LocalDB)\MSSQLLocalDB; Initial Catalog=SportSchoolScheduleDB;Integrated Security=True;Connect Timeout=30"));
*/
            builder.Services.AddDbContext<SportSchoolScheduleDBContext>(options => options.UseNpgsql(connstring));
            builder.Services.AddSwaggerGen();

            

            builder.WebHost.ConfigureKestrel(serverOptions =>
            {
                serverOptions.Configure(builder.Configuration.GetSection("Kestrel"));
            });



            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseSwagger();
            app.UseSwaggerUI();

            

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.MapControllers();

            app.Run();
        }
    }
}
