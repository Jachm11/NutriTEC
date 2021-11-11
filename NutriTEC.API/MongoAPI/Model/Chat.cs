using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MongoAPI.Model
{
    public class Chat
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public int id_cliente { get; set; }

        //[BsonElement("Name")]
        public int num_msg { get; set; }

        public string nombre_usuario { get; set; }

        public string rol { get; set; }

        public string msg { get; set; }
    }
}
