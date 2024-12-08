namespace PoopyPoApi.Models.Dto
{
    public class UsersDto
    {
        public string Id { get; set; }
        public string PrivateName { get; set; }
        public string FamilyName { get; set; }
        public string? Email { get; set; }
        public uint? PoopyScore { get; set; }
        public DateOnly? SignupDate { get; set; }
    }

    public class SignUpUsersDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Id { get; set; }
    }
}
