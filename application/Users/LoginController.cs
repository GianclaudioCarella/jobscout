using jobscout.Database;
using jobscout.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jobscout.Users
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly JobScoutDbContext _context;
        
        public LoginController(JobScoutDbContext context)
        {
            _context = context;
        }

        // GET: login/{email}/{password}
        [HttpGet("login/{email}/{password}")]
        public async Task<ActionResult<User>> GetUserByEmailAndPassword(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
