using PoopyPoApi.Models.Dto;

namespace PoopyPoApi.Services
{
    public interface IUsersService
    {
        public Task<List<UserDto>> GetAllUsers();

        public Task<bool> IsUserExits(string userId);

        public Task<UserDto> CreateUser(UserDto userDto);
    }
}
