using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetControl.Migrations
{
    /// <inheritdoc />
    public partial class ModificarBanco02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Veterinarian",
                table: "VaccineRecords",
                newName: "Veterinario");

            migrationBuilder.RenameColumn(
                name: "VaccineName",
                table: "VaccineRecords",
                newName: "ValidadeImunizante");

            migrationBuilder.RenameColumn(
                name: "Batch",
                table: "VaccineRecords",
                newName: "NomeVacina");

            migrationBuilder.RenameColumn(
                name: "ApplicationDate",
                table: "VaccineRecords",
                newName: "LoteVacinal");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataAplicacao",
                table: "VaccineRecords",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataAplicacao",
                table: "VaccineRecords");

            migrationBuilder.RenameColumn(
                name: "Veterinario",
                table: "VaccineRecords",
                newName: "Veterinarian");

            migrationBuilder.RenameColumn(
                name: "ValidadeImunizante",
                table: "VaccineRecords",
                newName: "VaccineName");

            migrationBuilder.RenameColumn(
                name: "NomeVacina",
                table: "VaccineRecords",
                newName: "Batch");

            migrationBuilder.RenameColumn(
                name: "LoteVacinal",
                table: "VaccineRecords",
                newName: "ApplicationDate");
        }
    }
}
