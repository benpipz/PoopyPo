using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Data
{
    public class PoopyDbContext(DbContextOptions dbContextOptions) : DbContext(dbContextOptions)
    {
        public DbSet<PoopLocation> PoopLocations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PoopInteraction> PoopInteractions { get; set; }
    }
}
