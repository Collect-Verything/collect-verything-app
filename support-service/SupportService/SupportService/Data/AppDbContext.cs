using Microsoft.EntityFrameworkCore;
using SupportService.Model;

namespace SupportService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Chat> Chats { get; set; }
        public DbSet<Conversation> Conversations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relation 1 Chat -> N Conversations
            modelBuilder.Entity<Chat>()
                .HasMany(c => c.Conversations)
                .WithOne(c => c.Chat)
                .HasForeignKey(c => c.ChatId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}