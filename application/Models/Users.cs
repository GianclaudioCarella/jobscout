using Microsoft.AspNetCore.Identity;

namespace jobscout.Models;

public class User : IdentityUser
{
    public string? Initials { get; set; }
    public List<string> Companies { get; set; } = [];
    public List<string> JobTitles { get; set; } = [];
    public List<string> CompaniesApplications { get; set; } = [];
}
