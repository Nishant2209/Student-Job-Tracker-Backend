const express = require("express");
const { Job } = require("../models/Job.js");
const { validateJob } = require("../validators/job.js");
const jobRouter = express.Router();

// Get all jobs
jobRouter.get("/", async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({
      applicationDate: -1,
    });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

// Create job
jobRouter.post("/", validateJob, async (req, res, next) => {
  try {
    const { _id, ...jobData } = req.body; // Ignore _id from user
    const job = new Job({
      ...jobData,
      user: req.user._id,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
});

// Update job
jobRouter.put("/:id", validateJob, async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    next(error);
  }
});

// Delete job
jobRouter.delete("/:id", async (req, res, next) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = { jobRouter };
