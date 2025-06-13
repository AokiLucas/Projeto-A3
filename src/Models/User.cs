namespace PetControl.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Pet> Pets { get; set; } = new List<Pet>();


        public User(string name, string password, string email)
        {
            Id = Guid.NewGuid();
            Name = name;
            Active = true;
            Email = email;
            Password = password;
            Pets = new List<Pet>();     // 1:N
        }

    }
}
