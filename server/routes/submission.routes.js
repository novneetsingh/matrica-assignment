import { Router } from "express";
import Submission from "../models/Submission.js";

const router = Router();

// create submission
router.post("/submit", async (req, res) => {
  try {
    const {
      fullName,
      emailAddress,
      mobileNumber,
      instituteName,
      role,
      address,
      city,
      state,
      pinCode,
      dateOfSubmission,
      remarks,
    } = req.body;

    if (
      !fullName ||
      !emailAddress ||
      !mobileNumber ||
      !instituteName ||
      !role ||
      !address ||
      !city ||
      !state ||
      !pinCode ||
      !dateOfSubmission
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const submission = new Submission({
      fullName,
      emailAddress,
      mobileNumber,
      instituteName,
      role,
      address,
      city,
      state,
      pinCode,
      dateOfSubmission,
      remarks,
    });

    await submission.save();

    res.status(201).json({ message: "Submission successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find()
      .sort({ dateOfSubmission: -1 })
      .lean();

    res.status(200).json({
      message:
        submissions?.length > 0
          ? "Submissions retrieved successfully"
          : "No submissions found",
      count: submissions?.length,
      data: submissions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
