import { StatusCodes } from "http-status-codes";
import customAPIError from "./custom-api.js";

class UnauthenticatedError extends customAPIError {
  constructor(msg) {
    super(msg);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
