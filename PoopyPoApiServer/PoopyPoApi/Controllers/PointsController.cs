using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Data;
using PoopyPoApi.Models.Domain;
using PoopyPoApi.Models.Dto;
using static System.Net.Mime.MediaTypeNames;

namespace PoopyPoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointsController : ControllerBase
    {
        private readonly PoopyDbContext _poopyDbContext;

        public PointsController(PoopyDbContext poopyDbContext)
        {
            _poopyDbContext = poopyDbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var locations = _poopyDbContext.PoopLocations.Include(o => o.User).ToList();

            var locationDto = new List<LocationDto>();
            foreach (var location in locations)
            {
                var dto = new LocationDto
                {
                    Id = location.Id,
                    Latitude = location.Latitude,
                    Longitude = location.Longitude,
                    Votes = location.Votes,
                    PoopDate = location.PoopDate,
                    UserId = location.UserId,
                    User = location.User,
                    Anonymous = location.Anonymous,
                    Description = location.Description,
                };
                if(location.Image is not null)
                {
                    dto.Image = Convert.ToBase64String(location.Image);
                }

                locationDto.Add(dto);
            }

            if (locationDto.Count == 0)
            {
                return NoContent();
            }

            return Ok(locationDto);
        }


        [HttpGet]
        [Route("{id:Guid}")]
        public IActionResult GetById([FromRoute]Guid id)
        {
            var location = _poopyDbContext.PoopLocations.FirstOrDefault(x => x.Id == id);

            if (location == null)
            {
                return NoContent();
            };

            var locationDto = new LocationDto
            {
                Id = location.Id,
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                Votes = location.Votes,
                PoopDate = location.PoopDate,
                User = location.User
            };

            return Ok(locationDto);
        }

        [HttpPost]
        public IActionResult Create([FromBody] LocationDto locationDto)
        {
            User user = _poopyDbContext.Users.FirstOrDefault(x => x.Id == locationDto.UserId);
            if(user is null)
            {
                return BadRequest();
            }
            if (_poopyDbContext.PoopLocations.Any(x => x.Latitude == locationDto.Latitude && x.Longitude == locationDto.Longitude))
            { 
                return NoContent();
            }

            var location = new PoopLocation
            {
                Id = new Guid(),
                Latitude = locationDto.Latitude,
                Longitude = locationDto.Longitude,
                Votes = 0,
                PoopDate = DateOnly.FromDateTime(DateTime.Now),
                UserId = user.Id,
                User = user,
                Anonymous = locationDto.Anonymous,
                Description = locationDto.Description,
                Image = locationDto.Image is not null ? Convert.FromBase64String(locationDto.Image) : null
            };

            _poopyDbContext.PoopLocations.Add(location);
            _poopyDbContext.SaveChanges();

            var locationDtoResponse = new LocationDto
            {
                Id = location.Id,
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                Votes = location.Votes,
                PoopDate = location.PoopDate,
                UserId = location.UserId,
                User = location.User,
                Anonymous = locationDto.Anonymous,
                Description = locationDto.Description,
                Image = locationDto.Image is not null ? Convert.ToBase64String(location.Image): null
            };

            return CreatedAtAction(nameof(GetById), new { id = locationDtoResponse.Id }, locationDtoResponse);
        }

        [HttpDelete]
        public IActionResult Delete()
        {
           var allEntities =  _poopyDbContext.PoopLocations.ToList();
            _poopyDbContext.PoopLocations.RemoveRange(allEntities);
           _poopyDbContext.SaveChanges();
            return Ok();
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public IActionResult UpdateVote([FromRoute]Guid id, [FromBody] PoopInteraction interaction)
        {
            var location = _poopyDbContext.PoopLocations.FirstOrDefault(x => x.Id == id);
            if(location is null)
            {
                return NoContent();
            }

            var interactionOnPoop = _poopyDbContext.PoopInteractions.FirstOrDefault(x => x.PoopLocation.Id == id && x.User.Id == interaction.UserId);
            if (interactionOnPoop != null)
            {
                if(interactionOnPoop.InteractionType == interaction.Interaction)
                {
                    return NoContent();
                }
                interactionOnPoop.InteractionType = interaction.Interaction;
            }
            else
            {
                PoopInteractions poopInteraction = new PoopInteractions
                {
                    Id = new Guid(),
                    InteractionType = interaction.Interaction,
                    PoopLocation = location,
                    User = _poopyDbContext.Users.FirstOrDefault(x => x.Id == interaction.UserId)
                };
                _poopyDbContext.PoopInteractions.Add(poopInteraction);
            }

            if (location == null)
            {
                return NoContent();
            };
            switch (interaction.Interaction)
            {
                case InteractionType.Upvote:
                    location.Votes++;
                    break;
                case InteractionType.Downvote:
                    location.Votes--;
                    break;
                default:
                    break;
            }
            _poopyDbContext.SaveChanges();

            return Ok(location);
        }

        [HttpGet]
        [Route("{id:Guid}/{userId}")]
        public IActionResult GetLastActionOnPoop([FromRoute]Guid id, [FromRoute]string userId)
        {
            var poopInteraction = _poopyDbContext.PoopInteractions.FirstOrDefault(x => x.User.Id == userId && x.PoopLocation.Id == id);
            if (poopInteraction is null)
            {
                return NoContent();
            }
            return Ok(poopInteraction.InteractionType);
        }

    }
}
