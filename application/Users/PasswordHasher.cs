using System.Security.Cryptography;

public sealed class PasswordHasher : IPasswordHasher
{
    private const int Iterations = 100000;
    private const int SaltSize = 16;
    private const int HashSize = 32;

    private static readonly HashAlgorithmName HashAlgorithm = HashAlgorithmName.SHA512;
    
    public string HashPassword(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithm, HashSize);

        return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
    }

    public bool Verify(string password, string hashedPassword)
    {
        string[] parts = hashedPassword.Split('-');
        byte[] hash = Convert.FromHexString(parts[0]);
        byte[] salt = Convert.FromHexString(parts[1]);

        byte[] computedHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, HashAlgorithm, HashSize);

        return CryptographicOperations.FixedTimeEquals(hash, computedHash);
    }
}