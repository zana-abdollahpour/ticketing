import { validationResult } from "express-validator";
import type { Request, Response, NextFunction } from "express";

import { RequestValidationError } from "../errors/request-validation-error";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.array()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
