import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export interface IError<T> {
    message: string;
    statusCode: number;
    data?: T;
}
export interface SendData<T> {
    statusCode: number;
    errorCode: number;
    message: string;
    data: T;
}
export declare class AllExceptionFilter implements ExceptionFilter {
    private static logger;
    constructor();
    catch(exception: HttpException, host: ArgumentsHost): void;
    private static handleResponse;
}
