using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Data
{
    public class PoopyDbContext : DbContext
    {
        public PoopyDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
        }

        public DbSet<PoopLocation> PoopLocations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PoopInteractions> PoopInteractions { get; set; }
    }
}
