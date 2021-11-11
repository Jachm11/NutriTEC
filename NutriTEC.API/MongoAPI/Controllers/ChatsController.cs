using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoAPI.Model;
using MongoAPI.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly ChatService _chatService;

        public ChatsController(ChatService chatService)
        {
            _chatService = chatService;
        }

        // GET: /api/chats
        // Retorna todos los chats.
        [HttpGet]
        public ActionResult<List<Chat>> Get() =>
            _chatService.Get();

        // GET: /api/chats/1
        // Retorna todos los chats de un cliente especifico.
        [HttpGet("{id_cliente}", Name = "GetChat")]
        public ActionResult<List<Chat>> Get(int id_cliente)
        {
            List<Chat> chatList = _chatService.Get(id_cliente);

            if (chatList == null)
            {
                return NotFound();
            }

            return chatList;
        }

        // POST: /api/chats/
        // Crea un nuevo mensaje.
        [HttpPost]
        public ActionResult<Chat> Create(Chat chat)
        {
            List<Chat> chatList = _chatService.Get(chat.id_cliente);
            chat.num_msg = chatList.Count + 1;

            _chatService.Create(chat);

            return CreatedAtRoute("GetChat", new { id_cliente = chat.id_cliente }, chat);
        }

        // DELETE: /api/chats/id
        // Elimina la lista de mensajes de un cliente
        [HttpDelete("{id_cliente}")]
        public IActionResult Delete(int id_cliente)
        {
            List<Chat> chat = _chatService.Get(id_cliente);

            if (chat.Count == 0)
            {
                return NotFound();
            }

            _chatService.Remove(id_cliente);

            return Ok();
        }
        
    }
}
