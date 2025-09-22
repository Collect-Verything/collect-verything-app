using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SupportService.Model;

//Message qui est envoyé dans un CHAT
public class Conversation
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Auteur { get; set; } = string.Empty;

    [Required]
    public string Message { get; set; } = string.Empty;

    public DateTime EnvoyeLe { get; set; } = DateTime.UtcNow;
    
    [ForeignKey(nameof(Chat))]
    public int ChatId { get; set; }
    
    public Chat? Chat { get; set; }
}