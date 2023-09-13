const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const sendMail = require("../utils/email");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // payload + secret + expire time
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const signTokenRefresh = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
  });
};
const createsendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const refreshToken = signTokenRefresh(user._id);
  // Remove the password from output
  // user.password = undefined;
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    token,
    refreshToken,
    user,
  });
};

exports.refreshToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  let token = refreshToken;
  let verifiedToken = null;

  try {
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("Invalid Refresh Token", 401));
  }

  const { id } = verifiedToken;
  const isUserExist = await User.findOne({ _id:id });

  if (!isUserExist) {
    return next(new AppError("user does not exist ", 400));
  }
  //generate new token

  createsendToken(isUserExist, 200, res);
});
exports.signup = catchAsync(async (req, res, next) => {
  let user = await User.create({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    profession: req.body.profession,
    favourite_color: req.body.favourite_color,
    password: req.body.password,
  });

  user.save({ validateBeforeSave: false });

  createsendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //  check email and password exist
    return next(new AppError(" please proveide email and password ", 400));
  }

  const user = await User.findOne({ email }).select("+password"); // select expiclity password

  if (!user)
    return next(new AppError(`No User found against email ${email}`, 404));
  if (
    !user || // check user exist and password correct
    !(await user.correctPassword(password, user.password))
  ) {
    // candinate password,correctpassword
    return next(new AppError("incorrect email or password", 401));
  }

  // if eveything is ok
  createsendToken(user, 200, res);
});


