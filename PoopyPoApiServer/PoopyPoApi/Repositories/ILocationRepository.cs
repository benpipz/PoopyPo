using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Repositories
{
    public interface ILocationRepository
    {
        public Task<List<PoopLocation>> GetAllLocationsAsync();
        public Task<PoopLocation> GetLocationByIdAsync(Guid id);
        public Task<User> GetUserById(string id);

        public Task<PoopLocation> CreateLocationAsync(PoopLocation location);

        public Task<bool> DeleteAsync();

        public Task<PoopInteraction> UpdateLocationInteractionAsync(PoopInteraction interaction, PoopLocation poopLocation);

        public Task<PoopInteraction> GetLastInteractionOnPointAsync(Guid id, string userId);
        public Task<PoopLocation> UpdatePoopLocation(PoopLocation poopLocation);

    }
}
