using Enquiry.API.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Configure CORS (only once)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngularApp",
        policy => {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

builder.Services.AddDbContext<EnquiryDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("EnquiryCon")));

var app = builder.Build();

// IMPORTANT: UseCors must come BEFORE UseAuthorization and AFTER UseHttpsRedirection
app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
