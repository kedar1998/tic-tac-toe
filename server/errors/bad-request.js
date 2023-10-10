import { StatusCodes } from "http-status-codes";
import customAPIError from "./custom-api.js";

class BadRequestError extends customAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
