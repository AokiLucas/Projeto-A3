using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PetControl.Migrations
{
    /// <inheritdoc />
    public partial class ModificarBanco03 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VaccineRecords");

            migrationBuilder.CreateTable(
                name: "RegistroVacinas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    NomeVacina = table.Column<string>(type: "TEXT", nullable: false),
                    DataAplicacao = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LoteVacinal = table.Column<string>(type: "TEXT", nullable: false),
                    ValidadeImunizante = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Veterinario = table.Column<string>(type: "TEXT", nullable: false),
                    PetId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistroVacinas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistroVacinas_Pets_PetId",
                        column: x => x.PetId,
                        principalTable: "Pets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RegistroVacinas_PetId",
                table: "RegistroVacinas",
                column: "PetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RegistroVacinas");

            migrationBuilder.CreateTable(
                name: "VaccineRecords",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    PetId = table.Column<Guid>(type: "TEXT", nullable: false),
                    DataAplicacao = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LoteVacinal = table.Column<string>(type: "TEXT", nullable: false),
                    NomeVacina = table.Column<string>(type: "TEXT", nullable: false),
                    ValidadeImunizante = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Veterinario = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VaccineRecords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VaccineRecords_Pets_PetId",
                        column: x => x.PetId,
                        principalTable: "Pets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VaccineRecords_PetId",
                table: "VaccineRecords",
                column: "PetId");
        }
    }
}
