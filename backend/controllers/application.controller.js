import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// ----------------------------- APPLY TO JOB -----------------------------
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job ID is required.",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
        success: false,
      });
    }

    const job = await Job.findById(jobId).populate("created_by");
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    // ✅ Upload resume to cloudinary
    const fileUri = getDataUri(req.file);
    const cloudResult = await cloudinary.uploader.upload(fileUri.content, {
      folder: "resumes",
    });
    const resumeUrl = cloudResult.secure_url;

    const applicant = await User.findById(userId);

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
      resume: resumeUrl,
    });

    job.applications.push(newApplication._id);
    await job.save();

    // Send HTML email to recruiter with resume attachment if available
    const recruiterEmail = job.created_by?.email;
    if (recruiterEmail) {
      const subject = `New Application for \"${job.title}\"`;
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2 style="color: #2c3e50;">New Application for \"${job.title}\"</h2>
          <p>Hello ${job.created_by.name || "Recruiter"},</p>
          <p><strong>${
            applicant?.name || "An applicant"
          }</strong> has applied for your job posting titled <strong>${
        job.title
      }</strong>.</p>
          <p>Please review the application in your dashboard.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #888;">Regards,<br>Job Portal Team</p>
        </div>
      `;

      const attachments = resumeUrl
        ? [
            {
              filename: "resume.pdf",
              path: resumeUrl,
            },
          ]
        : [];

      await sendEmail({
        to: recruiterEmail,
        subject,
        html,
        attachments,
      });
    }

    return res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong.", success: false });
  }
};

// ---------------------- GET APPLIED JOBS (STUDENT) -----------------------
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    if (!application || application.length === 0) {
      return res.status(404).json({
        message: "No applications found.",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong.", success: false });
  }
};

// --------------------- GET ALL APPLICANTS (ADMIN) ------------------------
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong.", success: false });
  }
};

// ------------------------- UPDATE APPLICATION STATUS ---------------------
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId).populate(
      "applicant job"
    );
    if (!application) {
      return res.status(404).json({
        message: "Application not found.",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    // Send HTML email to applicant
    const applicant = application.applicant;
    if (applicant && applicant.email) {
      const subject = `Your application for \"${
        application.job.title
      }\" has been ${status.toLowerCase()}`;
      const html = `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
          <h2 style="color: #2c3e50;">Application Status Update</h2>
          <p>Hi ${applicant.name},</p>
          <p>Your application for the job <strong>\"${
            application.job.title
          }\"</strong> has been <strong>${status.toLowerCase()}</strong>.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #888;">Regards,<br>Job Portal Team</p>
        </div>
      `;

      await sendEmail({
        to: applicant.email,
        subject,
        html,
      });
    }

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong.", success: false });
  }
};