using PoopyPoApi.Models.Domain;
using PoopyPoApi.Models.Dto;
using PoopyPoApi.Repositories;

namespace PoopyPoApi.Services
{
    public class UsersService(IUsersRepository usersRepository) : IUsersService
    {
        private readonly IUsersRepository _usersRepository = usersRepository;

        public async Task<UserDto> CreateUser(UserDto userDto)
        {
            User user = new User()
            {
                SignupDate = DateOnly.FromDateTime(DateTime.Now),
                Name = userDto.Name,
                Email = userDto.Email,
                PoopyScore = 0,
                Id = userDto.Id,
            };

            var creatredUser = await _usersRepository.CreateUser(user);

            var resultDto = new UserDto()
            {
                SignupDate = creatredUser.SignupDate,
                Name = creatredUser.Name,
                Email = creatredUser.Email,
                PoopyScore = creatredUser.PoopyScore,
                Id = creatredUser.Id,
            };

            return resultDto;
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            var users = await _usersRepository.GetAllUsers();
            List<UserDto> userDtos = new();
            foreach (var user in users)
            {
                UserDto userDto = new()
                {
                    Name = user.Name,
                    Email = user.Email,
                    PoopyScore = user.PoopyScore,
                    Id = user.Id,
                    SignupDate = user.SignupDate,
                };
                userDtos.Add(userDto);
            }

            return userDtos;
        }

        public async Task<bool> IsUserExits(string userId)
        {
            var user = await _usersRepository.IsUserExists(userId);
            if(user == null)
            {
                return false;
            }

            return true;
        }
    }
}
