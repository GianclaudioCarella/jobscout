using jobscout.Models;

namespace jobscout.Users;

public sealed class LoginUser(IUserRepository userRepository, IPasswordHasher passwordHasher) : ILoginUser
{
    public record Request(string Email, string Password);

    public async Task<User> Handle(Request request)
    {
        var user = await userRepository.GetUserByEmailAsync(request.Email);

        if (user is null)
        {
            throw new UnauthorizedAccessException("Invalid username or password.");
        }

        bool verified = passwordHasher.Verify(request.Password, user.Password);

        if (!verified)
        {
            throw new UnauthorizedAccessException("Invalid username or password.");
        }

        return user;
    }
    
}

