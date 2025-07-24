using StackExchange.Redis;

namespace RedisInfrastructure
{
    public interface ICacheService
    {
        public Task SetCacheValue(string key, string value);

        public Task<string> GetCacheValue(string key);

        public Task SetCacheValueWithExpiry(string key, string value, TimeSpan expiry);

        public Task RemoveCacheValue(string key);

    }
}
