using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetControl.Migrations
{
    /// <inheritdoc />
    public partial class ModificarBanco01 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Weight",
                table: "Pets",
                newName: "Peso");

            migrationBuilder.RenameColumn(
                name: "Species",
                table: "Pets",
                newName: "Sexo");

            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "Pets",
                newName: "Observacoes");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Pets",
                newName: "Raca");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Pets",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "DateOfBirth",
                table: "Pets",
                newName: "Especie");

            migrationBuilder.RenameColumn(
                name: "Breed",
                table: "Pets",
                newName: "DataNascimento");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sexo",
                table: "Pets",
                newName: "Species");

            migrationBuilder.RenameColumn(
                name: "Raca",
                table: "Pets",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Peso",
                table: "Pets",
                newName: "Weight");

            migrationBuilder.RenameColumn(
                name: "Observacoes",
                table: "Pets",
                newName: "Notes");

            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Pets",
                newName: "Gender");

            migrationBuilder.RenameColumn(
                name: "Especie",
                table: "Pets",
                newName: "DateOfBirth");

            migrationBuilder.RenameColumn(
                name: "DataNascimento",
                table: "Pets",
                newName: "Breed");
        }
    }
}
