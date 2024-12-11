using Microsoft.AspNetCore.Mvc;
using PoopyPoApi.Models.Dto;
using PoopyPoApi.Services;

namespace PoopyPoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PointsController(IPointsService pointsService) : ControllerBase
    {
        private readonly IPointsService _pointsService = pointsService;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var points = await _pointsService.GetAllPointsAsync();

            if (points.Count == 0)
            {
                return NoContent();
            }

            return Ok(points);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var location = await _pointsService.GetPointByIdAsync(id);

            if (location == null)
            {
                return NoContent();
            };

            return Ok(location);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PoopLocationDto locationDto)
        {
            var createdLocationDto = await _pointsService.CreateLocationAsync(locationDto);

            return CreatedAtAction(nameof(GetById), new { id = createdLocationDto.Id }, createdLocationDto);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            _ = await _pointsService.DeleteAsync();
            return Ok();
        }

        [HttpPut]
        [Route("{LocationdId:Guid}")]
        public async Task<IActionResult> UpdateVote([FromRoute] Guid LocationdId, [FromBody] PoopInteractionDto interaction)
        {
            var locationDto = await _pointsService.UpdatePoopInteraction(LocationdId, interaction);

            if (locationDto == null)
            {
                return NoContent();
            };

            return Ok(locationDto);
        }

        [HttpGet]
        [Route("{id:Guid}/{userId}")]
        public async Task<IActionResult> GetLastActionOnPoop([FromRoute] Guid id, [FromRoute] string userId)
        {
            var poopInteraction = await _pointsService.GetLastInteractionOnPointAsync(id, userId);
            if (poopInteraction is null)
            {
                return NoContent();
            }
            return Ok(poopInteraction.Interaction);
        }
    }
}
