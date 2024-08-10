import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { GMAIL_USER, GMAIL_PASS } = process.env;


export const sendEmailNotification = async (email, message, subject) => {
  try {
    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const mailDetails = {
      from: GMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    };

    const send = await mailTransporter.sendMail(mailDetails);
    if (send) console.log("Email sent successfully");
    else console.log("Error in sending email");
  } catch (error) {
    console.log(error, "Error in sending email");
  }
};

