import { Logger, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
export declare class AppService implements OnModuleInit, OnApplicationShutdown {
    private readonly logger;
    constructor(logger: Logger);
    onModuleInit(): void;
    onApplicationShutdown(signal?: string): void;
}
