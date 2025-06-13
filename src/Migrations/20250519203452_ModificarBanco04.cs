using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetControl.Migrations
{
    /// <inheritdoc />
    public partial class ModificarBanco04 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhotoUrl",
                table: "Pets",
                newName: "FotoUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FotoUrl",
                table: "Pets",
                newName: "PhotoUrl");
        }
    }
}
