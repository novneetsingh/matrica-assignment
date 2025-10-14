import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  instituteName: { type: String, required: true },
  role: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  dateOfSubmission: { type: Date, default: Date.now },
  remarks: { type: String },
});

export default Submission = mongoose.model("Submission", submissionSchema);
