using PoopyPoApi.Models.Dto;

namespace PoopyPoApi.Services
{
    public interface IPointsService
    {
        public Task<List<PoopLocationDto>> GetAllPointsAsync();
        public Task<PoopLocationDto> GetPointByIdAsync(Guid id);
        public Task<PoopLocationDto> CreateLocationAsync(PoopLocationDto location);
        public Task<bool> DeleteAsync();
        public Task<PoopLocationDto> UpdatePoopInteraction(Guid poodLocationId, PoopInteractionDto poopInteraction);

        public Task<PoopInteractionDto> GetLastInteractionOnPointAsync(Guid id, string userId);
    }

}
