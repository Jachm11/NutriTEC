namespace MongoAPI.Models
{
    public class ChatNutriDatabaseSettings : IChatNutriDatabaseSettings
    {
        public string ChatsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IChatNutriDatabaseSettings
    {
        string ChatsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}