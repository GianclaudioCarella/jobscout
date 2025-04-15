using jobscout.Models;

namespace jobscout.Users;

public interface ILoginUser
{
    Task<User> Handle(LoginUser.Request request);
}