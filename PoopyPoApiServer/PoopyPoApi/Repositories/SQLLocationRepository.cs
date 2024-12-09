using Microsoft.EntityFrameworkCore;
using PoopyPoApi.Data;
using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Repositories
{
    public class SQLLocationRepository(PoopyDbContext dbContex) : ILocationRepository
    {
        private readonly PoopyDbContext _dbContext = dbContex;

        public async Task<PoopLocation> CreateLocationAsync(PoopLocation locationDto)
        {
            _ = await _dbContext.PoopLocations.AddAsync(locationDto);
            _ = await _dbContext.SaveChangesAsync();
            return locationDto;
        }

        public async Task<bool> DeleteAsync()
        {
            List<PoopLocation> poopLocations = await _dbContext.PoopLocations.ToListAsync();
            _dbContext.PoopLocations.RemoveRange(poopLocations);
            _ = await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<PoopLocation>> GetAllLocationsAsync()
        {
            return await _dbContext.PoopLocations.Include(o => o.User).ToListAsync();
        }

        public async Task<PoopLocation> GetLocationByIdAsync(Guid id)
        {
            return await _dbContext.PoopLocations.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<PoopInteraction> GetLastInteractionOnPointAsync(Guid id, string userId)
        {
            return await _dbContext.PoopInteractions.FirstOrDefaultAsync(x => x.User.Id == userId && x.PoopLocation.Id == id);
        }

        public async Task<PoopInteraction> UpdateLocationInteractionAsync(PoopInteraction interaction, PoopLocation poopLocation)
        {
            var interactionOnPoop = await _dbContext.PoopInteractions.FirstOrDefaultAsync(x => x.PoopLocation.Id == poopLocation.Id && x.User.Id == interaction.User.Id);
            if (interactionOnPoop is not null)
            {
                interactionOnPoop.InteractionType = interaction.InteractionType;
            }
            else
            {
                PoopInteraction poopInteraction = new PoopInteraction
                {
                    Id = new Guid(),
                    InteractionType = interaction.InteractionType,
                    PoopLocation = poopLocation,
                    User = _dbContext.Users.FirstOrDefault(x => x.Id == interaction.User.Id)
                };
                _dbContext.PoopInteractions.Add(poopInteraction);
            }

            _ = await _dbContext.SaveChangesAsync();

            return interactionOnPoop;
        }

        public async Task<User> GetUserById(string id)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<PoopLocation> UpdatePoopLocation(PoopLocation poopLocation)
        {
            var location = await _dbContext.PoopLocations.FirstOrDefaultAsync(x => x.Id == poopLocation.Id);

            location.Votes = poopLocation.Votes;
            location.Description = poopLocation.Description;
            location.Image = poopLocation.Image;

            _ = await _dbContext.SaveChangesAsync();

            return location;
        }
    }
}
