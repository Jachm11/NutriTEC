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

        [HttpGet]
        public ActionResult<List<Chat>> Get() =>
            _chatService.Get();

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

        [HttpPost]
        public ActionResult<Chat> Create(Chat chat)
        {
            List<Chat> chatList = _chatService.Get(chat.id_cliente);
            chat.num_msg = chatList.Count + 1;

            _chatService.Create(chat);

            return CreatedAtRoute("GetChat", new { id_cliente = chat.id_cliente }, chat);
        }
        
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
