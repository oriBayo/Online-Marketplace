using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("Notifications")]
public class Notification
{
    [Key]
    public int Id { get; set; }
    public string? UserId { get; set; }
    public string? Message { get; set; }
    public bool? IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}