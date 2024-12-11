using StackExchange.Redis;

namespace RedisInfrastructure
{
    public class RedisService : ICacheService
    {
        private readonly ConnectionMultiplexer _redis;
        private readonly IDatabase _database;

        public RedisService(string connectionString)
        {
            _redis = ConnectionMultiplexer.Connect(connectionString);
            _database = _redis.GetDatabase();
        }

        public async Task SetCacheValue(string key, string value)
        {
            try
            {

                await _database.StringSetAsync(key, value);
            }
            catch (Exception ex)
            {
                Console.WriteLine(  "Badasd");
            }
        }

        public async Task<string> GetCacheValue(string key)
        {
            var value = await _database.StringGetAsync(key);
            return value;
        }

        public async Task SetCacheValueWithExpiry(string key, string value, TimeSpan expiry)
        {
            await _database.StringSetAsync(key, (RedisValue)value, expiry);
        }

        public async Task RemoveCacheValue(string key)
        {
            await _database.KeyDeleteAsync(key);
        }
    }
}
