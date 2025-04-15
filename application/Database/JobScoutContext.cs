using System;
using jobscout.Models;
using Microsoft.EntityFrameworkCore;

namespace jobscout.Database;

public class JobScoutDbContext : DbContext
{
    public JobScoutDbContext(DbContextOptions<JobScoutDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
}

