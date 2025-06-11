using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SportSchool.API.Migrations.SportSchoolDbPostgre
{
    /// <inheritdoc />
    public partial class AddUserRelationsToCoachAndAthlete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Role",
                table: "users",
                newName: "role");

            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "coaches",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "user_id",
                table: "athletes",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_coaches_user_id",
                table: "coaches",
                column: "user_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_athletes_user_id",
                table: "athletes",
                column: "user_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_athletes_users_user_id",
                table: "athletes",
                column: "user_id",
                principalTable: "users",
                principalColumn: "user_guid",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_coaches_users_user_id",
                table: "coaches",
                column: "user_id",
                principalTable: "users",
                principalColumn: "user_guid",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_athletes_users_user_id",
                table: "athletes");

            migrationBuilder.DropForeignKey(
                name: "FK_coaches_users_user_id",
                table: "coaches");

            migrationBuilder.DropIndex(
                name: "IX_coaches_user_id",
                table: "coaches");

            migrationBuilder.DropIndex(
                name: "IX_athletes_user_id",
                table: "athletes");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "coaches");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "athletes");

            migrationBuilder.RenameColumn(
                name: "role",
                table: "users",
                newName: "Role");
        }
    }
}
