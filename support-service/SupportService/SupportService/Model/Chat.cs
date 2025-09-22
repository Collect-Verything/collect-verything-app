using System.ComponentModel.DataAnnotations;

namespace SupportService.Model;

//Salon de discussion
public class Chat
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nom { get; set; } = string.Empty;
    
    public string UrlDeLaSolution { get; set; } = string.Empty;

    public bool Resolu { get; set; } = false;
    public ICollection<Conversation> Conversations { get; set; } = new List<Conversation>();
}