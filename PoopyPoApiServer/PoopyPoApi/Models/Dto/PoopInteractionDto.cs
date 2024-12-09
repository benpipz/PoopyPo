using PoopyPoApi.Models.Domain;

namespace PoopyPoApi.Models.Dto
{
    public class PoopInteractionDto
    {
        public string UserId { get; set; }
        public InteractionType Interaction { get; set; }
    }
}
