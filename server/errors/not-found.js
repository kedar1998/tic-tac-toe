import { StatusCodes } from "http-status-codes";
import customAPIError from "./custom-api.js";

class NotFoundError extends customAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
