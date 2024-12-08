using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Data;
using PoopyPoApi.Models.Domain;
using PoopyPoApi.Models.Dto;

namespace PoopyPoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly PoopyDbContext _poopyDbContext;

        public UsersController(PoopyDbContext poopyDbContext)
        {
            _poopyDbContext = poopyDbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _poopyDbContext.Users.ToList();

            if (users.Count == 0)
            {
                return NoContent();
            }

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> IsUserExists([FromRoute] string id)
        {
            var user = await _poopyDbContext.Users.FirstOrDefaultAsync(x => x.Id == id);

            if (user is null)
            {
                return StatusCode(204);
            }

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser([FromBody] UserDto singUpUserDto)
        {
            UserDto userDto = new UserDto();

            User user = new User();
            user.SignupDate = DateOnly.FromDateTime(DateTime.Now);
            user.Name = singUpUserDto.Name;
            user.Email = singUpUserDto.Email;
            user.PoopyScore = 0;
            user.Id = singUpUserDto.Id;

            _poopyDbContext.Users.Add(user);
            _poopyDbContext.SaveChanges();

            return Ok();
        }


    }
}
