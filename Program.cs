using PetControl.Services;
using PetControl.Repositories;
using PetControl.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add distributed cache and session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.Lax; // Use Lax for HTTP
    // Do NOT set SecurePolicy for HTTP
});

// Register DbContext (no need for connection string here)
builder.Services.AddDbContext<AppDbContext>();

// Register repositories and services
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPetRepository, PetRepository>();
builder.Services.AddScoped<IVacinaRepository, VacinaRepository>();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PetService>();
builder.Services.AddScoped<VacinaService>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React dev server
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Allow cookies/session
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors("AllowLocalhost3000");
app.UseSession();
app.UseAuthorization();
app.MapControllers();

app.MapControllerRoute(
   name: "default",
   pattern: "{controller=Login}/{action=Login}/{id?}");

app.Run();