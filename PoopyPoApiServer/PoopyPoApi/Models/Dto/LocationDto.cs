using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Models.Dto
{
    public class LocationDto
    {
        public Guid? Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int? Votes { get; set; }
        public string UserId { get; set; }
        public DateOnly? PoopDate { get; set; }
        public User? User { get; set; }
        public string? Image { get; set; }
        public bool? Anonymous { get; set; }
        public string? Description { get; set; }

    }
}
