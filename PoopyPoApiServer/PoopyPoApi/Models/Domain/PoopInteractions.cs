namespace PoopyPoApi.Models.Domain
{
    public class PoopInteractions
    {
        public Guid Id { get; set; }
        public InteractionType InteractionType { get; set; }

        //navigation properties
        public PoopLocation PoopLocation { get; set; }
        public User User { get; set; }
    }

    public enum InteractionType
    {
        None,
        Upvote,
        Downvote
    }
}
