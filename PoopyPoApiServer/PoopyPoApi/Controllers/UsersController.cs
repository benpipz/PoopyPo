using Microsoft.AspNetCore.Mvc;
using PoopyPoApi.Models.Domain;
using PoopyPoApi.Models.Dto;
using PoopyPoApi.Services;

namespace PoopyPoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController(IUsersService usersService) : ControllerBase
    {
        private readonly IUsersService _usersService = usersService;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var usersDto = await _usersService.GetAllUsers();

            if (usersDto.Count == 0)
            {
                return NoContent();
            }

            return Ok(usersDto);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> IsUserExists([FromRoute] string id)
        {
            bool isExists = await _usersService.IsUserExits(id);

            if (!isExists)
            {
                return StatusCode(204);
            }

            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserDto singUpUserDto)
        {
            var userDto = await _usersService.CreateUser(singUpUserDto);

            User user = new()
            {
                SignupDate = (DateOnly)userDto.SignupDate,
                Name = userDto.Name,
                Email = userDto.Email,
                PoopyScore = (uint)userDto.PoopyScore,
                Id = userDto.Id,
            };

            return Created($"/api/users/{user.Id}",null);
        }


    }
}
