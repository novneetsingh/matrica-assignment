import { Router } from "express";
import Submission from "../models/Submission.js";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import mammoth from "mammoth";
import pdf from "html-pdf-node";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// POST /submit route (fixed)
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
    } = req.body;

    // 1. Validate incoming data
    if (
      !fullName ||
      !emailAddress ||
      !mobileNumber ||
      !instituteName ||
      !role ||
      !address ||
      !city ||
      !state ||
      !pinCode
    ) {
      return res
        .status(400)
        .json({ message: "All fields except remarks are required" });
    }

    // 2. Save to database
    const savedSubmission = await Submission.create({ ...req.body });

    // 3. Load the DOCX template
    const templatePath = path.resolve(
      __dirname,
      "..",
      "templates",
      "Matrica_Intern_Assignment_Template.docx"
    );
    const content = fs.readFileSync(templatePath, "binary");

    // 4. Initialize PizZip and Docxtemplater
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      delimiters: { start: "{{", end: "}}" },
      paragraphLoop: true,
      linebreaks: true,
    });

    // 5. Render the template with data
    doc.render({
      FullName: savedSubmission.fullName,
      Email: savedSubmission.emailAddress,
      Mobile: savedSubmission.mobileNumber,
      Company: savedSubmission.instituteName,
      Role: savedSubmission.role,
      Address: savedSubmission.address,
      City: savedSubmission.city,
      State: savedSubmission.state,
      PinCode: savedSubmission.pinCode,
      Date: savedSubmission.dateOfSubmission,
      Remarks: savedSubmission.remarks,
    });

    // 6. Generate DOCX buffer
    const docxBuffer = doc.toBuffer();

    // 7. Define output paths
    const outputDir = path.resolve(__dirname, "..", "public", "pdfs");
    const pdfFilePath = path.join(outputDir, `${savedSubmission._id}.pdf`);

    // 8. Ensure directory exists and save DOCX
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 9. Convert DOCX to HTML using mammoth
    const { value: htmlContent } = await mammoth.convertToHtml({
      buffer: docxBuffer,
    });

    // 10. Convert HTML to PDF using html-pdf-node
    const file = { content: htmlContent };
    const options = { format: "A4", margin: { top: "20mm", bottom: "20mm" } };

    const pdfBuffer = await pdf.generatePdf(file, options);

    // 11. Save PDF
    fs.writeFileSync(pdfFilePath, pdfBuffer);

    // 12. Respond
    res.status(201).json({
      message: "Submission saved and PDF generated!",
    });
  } catch (error) {
    console.error("Error processing submission:", error);
    res
      .status(500)
      .json({ message: "Error processing submission", error: error.message });
  }
});

// get all submissions
router.get("/getAllSubmissions", async (req, res) => {
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
