using application;
using application.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jobscout.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : Controller
{
    private readonly JobScoutContext _context;

    public UsersController(JobScoutContext context)
    {
        _context = context;
    }

    [HttpGet("getuser")]
    public async Task<IActionResult> GetUser(string userName)
    {
        var user = await _context.Users.Where(u => u.Username == userName).FirstOrDefaultAsync();
        return Ok(user);
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }
}
