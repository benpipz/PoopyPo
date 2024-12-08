using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Models.Dto
{
    public class PoopInteraction
    {
        public string UserId { get; set; }
        public InteractionType Interaction { get; set; }
    }
}
