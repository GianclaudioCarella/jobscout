using jobscout.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace jobscout.Migrations
{
    [Route("api/[controller]")]
    [ApiController]
    public class MigrationController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpPost("Execute")]
        public void Migrate()
        {
            _context.Migrate();
        }
    }
}
