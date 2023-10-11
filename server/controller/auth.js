import User from "../models/User.js";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticatedError.js";
import { StatusCodes } from "http-status-codes";

const signUpController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  const user = await User.create(req.body);

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    name: user.name,
    email: user.email,
    password: user.password,
    token,
  });
};

const signInController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    name: user.name,
    token,
  });
};

export { signUpController, signInController };
