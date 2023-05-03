const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/index");
const { errorTrigger } = require("./errorMiddleware");

// Generate JWT
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Authetntication with JWT
const authentication = asyncHandler(async (req, res, next) => {
  let token = false;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      console.error(error);
    }
  }
  if (!token) {
    errorTrigger(res, 403, "Token is missing");
  }

  let decoded;
  try {
    // verify token
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    errorTrigger(res, 403, "Invalid token");
  }

  // get user from the token
  req.user = await User.findById(decoded.id).select("-password");
  if (!req.user) {
    errorTrigger(res, 403, "User cannot be found");
  }

  // generate a new token
  req.user.token = generateJWT(req.user.id);

  next();
});

// validation of user profile data
const userValidation = (values) => {
  // validate email
  const error = validateEmail(values.email);
  if (error) {
    errorTrigger(res, 400, error);
  }

  return values;
};

module.exports = { authentication, generateJWT, userValidation };
