import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { HttpStatus } from "../constants/statusCode";
import { Messages } from "../constants/messages";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: Messages.VALIDATION_FAILED,
          errors: error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }

      // Any other error
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: Messages.INTERNAL_SERVER_ERROR });
    }
  };
