export class ErrorHTTP extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export class ErrorDB extends ErrorHTTP {
    static TIPO = 'ErrorDB';

    constructor(message: string, status: number) {
        super(message, status);

        this.name = ErrorDB.TIPO;
    }
}