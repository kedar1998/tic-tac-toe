import { StatusCodes } from "http-status-codes";
import customAPIError from "./custom-api.js";

class BadRequestError extends customAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
