import { Request, Response, NextFunction } from "express";
import { Injectable, NestMiddleware, Logger } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl, body } = request;

    response.on("finish", () => {
      const { statusCode } = response;
      const contentLength = response.get("content-length");

      this.logger.log(
        `${method} REQ ${originalUrl} | WITH BODY ${JSON.stringify(body)} | RETURNS HTTP CODE ${statusCode} | WITH LEN ${contentLength}`
      );
    });

    next();
  }
}