using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupportService.Data;
using SupportService.Model;

namespace SupportService.Controller;

[ApiController]
    [Route("api/[controller]")]
    public class ChatsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChatsController(AppDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chat>>> GetChats()
        {
            return await _context.Chats
                .Include(c => c.Conversations)
                .ToListAsync();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Chat>> GetChat(int id)
        {
            var chat = await _context.Chats
                .Include(c => c.Conversations)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (chat == null)
            {
                return NotFound();
            }

            return chat;
        }
        
        [HttpPost]
        public async Task<ActionResult<Chat>> PostChat(Chat chat)
        {
            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetChat), new { id = chat.Id }, chat);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChat(int id, Chat chat)
        {
            if (id != chat.Id)
            {
                return BadRequest();
            }

            _context.Entry(chat).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Chats.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteChat(int id)
        {
            var chat = await _context.Chats.FindAsync(id);
            if (chat == null)
            {
                return NotFound();
            }

            _context.Chats.Remove(chat);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        
        [HttpGet("{chatId}/conversations")]
        public async Task<ActionResult<IEnumerable<Conversation>>> GetConversationsByChat(int chatId)
        {
            var chat = await _context.Chats
                .Include(c => c.Conversations)
                .FirstOrDefaultAsync(c => c.Id == chatId);

            if (chat == null)
            {
                return NotFound($"Aucun chat trouvé avec l'ID {chatId}");
            }

            return Ok(chat.Conversations);
        }
        
        [HttpGet("user/{auteur}")]
        public async Task<ActionResult<IEnumerable<Chat>>> GetChatsByUser(string auteur)
        {
            var chats = await _context.Chats
                .Include(c => c.Conversations)
                .Where(c => c.Conversations.Any(conv => conv.Auteur == auteur))
                .ToListAsync();

            if (!chats.Any())
            {
                return NotFound($"Aucun chat trouvé pour l'utilisateur {auteur}");
            }

            return Ok(chats);
        }
    }