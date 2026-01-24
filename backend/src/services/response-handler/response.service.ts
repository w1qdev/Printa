import { Response } from "express";

export class ResponseService {
  async sendErrorNotification(
    res: Response,
    data: object,
    statusCode: number = 200,
  ) {
    const responseResult = {
      status: "error",
      data,
    };

    return res.status(statusCode).json(responseResult);
  }

  async sendMessageNotification(
    res: Response,
    data: object,
    statusCode: number = 200,
  ) {
    const response = {
      status: "ok",
      data,
    };

    return res.status(statusCode).json(response);
  }
}
