export class BaseError extends Error {
    constructor(statusCode: number, message: string) {
      super(message);
    }
  }
  