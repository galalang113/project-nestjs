export declare class Logger {
    private context;
    constructor(context: string);
    generateTimeStamp(): string;
    info(funcName: any, message: any): void;
    warn(funcName: any, message: any): void;
    error(funcName: any, message: any): void;
}
