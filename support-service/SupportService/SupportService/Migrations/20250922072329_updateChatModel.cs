using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SupportService.Migrations
{
    /// <inheritdoc />
    public partial class updateChatModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Resolu",
                table: "Conversations");

            migrationBuilder.DropColumn(
                name: "UrlDeLaSolution",
                table: "Conversations");

            migrationBuilder.AddColumn<bool>(
                name: "Resolu",
                table: "Chats",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UrlDeLaSolution",
                table: "Chats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Resolu",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "UrlDeLaSolution",
                table: "Chats");

            migrationBuilder.AddColumn<bool>(
                name: "Resolu",
                table: "Conversations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UrlDeLaSolution",
                table: "Conversations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
