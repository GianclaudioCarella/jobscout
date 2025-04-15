using System;
using application.Models;
using Microsoft.EntityFrameworkCore;

namespace application;

public class JobScoutContext : DbContext
{
    public JobScoutContext(DbContextOptions<JobScoutContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
}

