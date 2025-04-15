using jobscout.Database;
using jobscout.Models;
using Microsoft.EntityFrameworkCore;

public sealed class UserRepository(JobScoutDbContext dbContext) : IUserRepository
{
    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await dbContext.Users.FindAsync(id);
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task AddUserAsync(User user)
    {
        await dbContext.Users.AddAsync(user);
        await dbContext.SaveChangesAsync();
    }
}