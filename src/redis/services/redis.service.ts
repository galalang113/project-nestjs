import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
@Injectable()
export class RedisService {
	constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

	async get(key: string): Promise<string> {
		return await this.cacheManager.get(key)
	}
	async set(key: string, value: unknown, ttl?: number): Promise<void> {
		return await this.cacheManager.set(key, value, ttl)
	}
	async del(key: string): Promise<void> {
		return await this.cacheManager.del(key)
	}
}
