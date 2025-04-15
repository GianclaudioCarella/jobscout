using System.Text.Json.Serialization;

namespace application.Models;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Password { get; set; }
    //public required JsonAttribute Preferences { get; set; }
}
