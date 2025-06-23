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
        private readonly ApplicationDbContext _context;
        
        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: login/{email}
        [HttpGet("login/{email}")]
        public async Task<ActionResult<User>> GetUserByEmailAndPassword(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
