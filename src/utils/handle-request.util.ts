import { Response } from "express";
import { HttpStatus } from "../constants/statusCode";
import { LogMessages } from "../constants/messages";

type HandlerFunction<T> = () => Promise<{
  success: boolean;
  message: string;
  data?: T;
}>;

export async function handleRequest<T>(
  res: Response,
  fn: HandlerFunction<T>
): Promise<void> {
  try {
    const { success, message, data } = await fn();
    const status = success ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
    res.status(status).json({ success, message, data });
  } catch (error: any) {
    console.error(LogMessages.HANDLE_REQUEST_ERROR, error);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}
