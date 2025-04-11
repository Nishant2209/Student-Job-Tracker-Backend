const { z } = require("zod");

const registrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const validateRegistration = (req, res, next) => {
  try {
    registrationSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      errors: error.errors,
    });
  }
};
const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      errors: error.errors,
    });
  }
};

module.exports = { validateRegistration, validateLogin };
