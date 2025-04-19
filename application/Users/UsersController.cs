using jobscout.Models;
using jobscout.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jobscout.Users;

[ApiController]
[Route("api/[controller]")]
public class UsersController : Controller
{
    private readonly JobScoutDbContext _context;
    private readonly ILoginUser _userLogin;

    public UsersController(JobScoutDbContext context, ILoginUser userLogin)
    {
        _context = context;
        _userLogin = userLogin;
    }

    [HttpGet("getOneUser")]
    public async Task<IActionResult> GetAllUsers()
    {
        // var users = await _context.Users.FirstOrDefaultAsync();
        // if (users == null)
        // {
        //     return NotFound("No users found.");
        // }
        return Ok("Gianclaudio");
    }

    [HttpGet("getuser")]
    public async Task<IActionResult> GetUser(string userName)
    {
        var user = await _context.Users.Where(u => u.Username == userName).FirstOrDefaultAsync();
        return Ok(user);
    }

    [HttpPost("migrate")]
    public async void Migrate()
    {
        _context.Migrate();
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(string email, string password)
    {
        if(string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
        {
            return BadRequest("Email and password are required.");
        }

        var user = await _userLogin.Handle(new LoginUser.Request(email, password));

        return Ok(user);
    }
}
