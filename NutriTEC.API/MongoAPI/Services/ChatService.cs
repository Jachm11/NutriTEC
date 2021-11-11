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

        // Conexion con la base de datos de mongoDB en Atlas.
        public ChatService(IChatNutriDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _chats = database.GetCollection<Chat>(settings.ChatsCollectionName);
        }

        // ******************************* GET ALL CHATS **********************************
        // Get: retorna todos los chats de la base de datos en mongoDB.
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de chats
        public List<Chat> Get() =>
            _chats.Find(chat => true).ToList();

        // ******************************* GET BY ID **********************************
        // Get: retorna todos los chats de un cliente.
        // Parametros de entrada: sin parametros
        // Salida: List<Object>: lista de chats
        public List<Chat> Get(int id) =>
            _chats.Find<Chat>(chat => chat.id_cliente == id).ToList();

        // ******************************* CREATE **********************************
        // Create: agrega un nuevo mensaje a un a la base de datos.
        // Parametros de entrada: Chat: chat
        // Salida: Chat: chat creado
        public Chat Create(Chat chat)
        {
            _chats.InsertOne(chat);
            return chat;
        }

        // ******************************* REMOVE **********************************
        // Remove: remuve la lista de mensajes del cliente.
        // Parametros de entrada: int: id_cliente
        // Salida: no tiene salida.
        public void Remove(int id_cliente) =>
            _chats.DeleteMany(chat => chat.id_cliente == id_cliente);
    }
}
