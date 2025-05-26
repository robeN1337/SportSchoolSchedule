using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportSchool.API.Migrations.SportSchoolDbPostgre
{
    /// <inheritdoc />
    public partial class AddClassSessionTable_ClassNameField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClassName",
                table: "ClassSessions",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClassName",
                table: "ClassSessions");
        }
    }
}
