const { z } = require("zod");

const jobSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  applicationDate: z.string().datetime(),
  link: z.string().url().optional(),
});

const validateJob = (req, res, next) => {
  try {
    jobSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      message: "Validation error",
      errors: error.errors,
    });
  }
};

module.exports = { validateJob };
