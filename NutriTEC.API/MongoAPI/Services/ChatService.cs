using MongoAPI.Model;
using MongoAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoAPI.Services
{
    public class ChatService
    {

        private readonly IMongoCollection<Chat> _chats;

        public ChatService(IChatNutriDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _chats = database.GetCollection<Chat>(settings.ChatsCollectionName);
        }

        public List<Chat> Get() =>
            _chats.Find(chat => true).ToList();

/*        public Chat Get(int id_cliente) =>
            _chats.Find<Chat>(chat => chat.id_cliente == id_cliente).FirstOrDefault();*/

        public List<Chat> Get(int id) =>
            _chats.Find<Chat>(chat => chat.id_cliente == id).ToList();

        public Chat Create(Chat chat)
        {
            _chats.InsertOne(chat);
            return chat;
        }

        public void Update(int id_cliente, Chat chatIn) =>
            _chats.ReplaceOne(chat => chat.id_cliente == id_cliente, chatIn);

        public void Remove(Chat chatIn) =>
            _chats.DeleteOne(chat => chat.id_cliente == chatIn.id_cliente);

        public void Remove(int id_cliente) =>
            _chats.DeleteMany(chat => chat.id_cliente == id_cliente);
    }
}
