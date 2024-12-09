using PoopyPoApi.Models.Domain;
using PoopyPoApi.Models.Dto;
using PoopyPoApi.Repositories;

namespace PoopyPoApi.Services
{
    public class PointsService(ILocationRepository locationRepository) : IPointsService
    {
        private readonly ILocationRepository _locationRepository = locationRepository;

        public async Task<PoopLocationDto> CreateLocationAsync(PoopLocationDto locationDto)
        {
            User user = await _locationRepository.GetUserById(locationDto.UserId);

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

            _ = await _locationRepository.CreateLocationAsync(location);

            var locationDtoResponse = new PoopLocationDto
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
                Image = locationDto.Image is not null ? Convert.ToBase64String(location.Image) : null
            };

            return locationDtoResponse;
        }

        public async Task<bool> DeleteAsync()
        {
            return await _locationRepository.DeleteAsync();
        }

        public async Task<List<PoopLocationDto>> GetAllPointsAsync()
        {
            var locations = await _locationRepository.GetAllLocationsAsync();

            var locationDto = new List<PoopLocationDto>();
            foreach (var location in locations)
            {
                var dto = new PoopLocationDto
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
                if (location.Image is not null)
                {
                    dto.Image = Convert.ToBase64String(location.Image);
                }

                locationDto.Add(dto);
            }

            return locationDto;
        }

        public async Task<PoopInteractionDto> GetLastInteractionOnPointAsync(Guid id, string userId)
        {
            var interaction = await _locationRepository.GetLastInteractionOnPointAsync(id, userId);
            PoopInteractionDto poopInteractionDto = new PoopInteractionDto();
            poopInteractionDto.UserId = userId;

            if (interaction != null)
            {
                poopInteractionDto.Interaction = interaction.InteractionType;
            }
            return poopInteractionDto;
        }

        public async Task<PoopLocationDto> GetPointByIdAsync(Guid id)
        {
            var location = await _locationRepository.GetLocationByIdAsync(id);
            var locationDto = new PoopLocationDto
            {
                Id = location.Id,
                Latitude = location.Latitude,
                Longitude = location.Longitude,
                Votes = location.Votes,
                PoopDate = location.PoopDate,
                User = location.User
            };

            return locationDto;
        }

        public async Task<PoopLocationDto> UpdatePoopInteraction(Guid poodLocationId, PoopInteractionDto poopInteractionDto)
        {
            var location = await _locationRepository.GetLocationByIdAsync(poodLocationId);

            if (location is null)
            {
                throw new Exception();
            }
            User user = await _locationRepository.GetUserById(poopInteractionDto.UserId);
            PoopInteraction poopInteraction = new PoopInteraction
            {
                Id = new Guid(),
                InteractionType = poopInteractionDto.Interaction,
                PoopLocation = location,
                User = user
            };
            switch (poopInteraction.InteractionType)
            {
                case InteractionType.None:
                    break;
                case InteractionType.Upvote:
                    location.Votes++;
                    break;
                case InteractionType.Downvote:
                    location.Votes--;
                    break;
                case InteractionType.UndoUpvote:
                    location.Votes--;
                    break;
                case InteractionType.UndoDowvote:
                    location.Votes++;
                    break;
            }

            var updatedLocation = await _locationRepository.UpdatePoopLocation(location);
            var interaction = await _locationRepository.UpdateLocationInteractionAsync(poopInteraction, updatedLocation);


            var locationDtoResponse = new PoopLocationDto
            {
                Id = updatedLocation.Id,
                Latitude = updatedLocation.Latitude,
                Longitude = updatedLocation.Longitude,
                Votes = updatedLocation.Votes,
                PoopDate = updatedLocation.PoopDate,
                UserId = updatedLocation.UserId,
                User = updatedLocation.User,
                Anonymous = updatedLocation.Anonymous,
                Description = updatedLocation.Description,
                Image = updatedLocation.Image is not null ? Convert.ToBase64String(updatedLocation.Image) : null
            };

            return locationDtoResponse;
        }
    }
}
