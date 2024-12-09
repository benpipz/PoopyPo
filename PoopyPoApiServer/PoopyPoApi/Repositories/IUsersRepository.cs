using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Repositories
{
    public interface IUsersRepository
    {
        public Task<List<User>> GetAllUsers();
        public Task<User> IsUserExists(string userId);
        public Task<User> CreateUser(User user);
    }
}
