using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Data;
using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Repositories
{
    public class SQLUserRepository(PoopyDbContext dbContext) : IUsersRepository
    {
        private readonly PoopyDbContext _dbContext = dbContext;

        public async Task<User> CreateUser(User user)
        {
            _ = await _dbContext.Users.AddAsync(user);
            _ = _dbContext.SaveChangesAsync();

            return user; ;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }

        public async Task<User> IsUserExists(string userId)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}
