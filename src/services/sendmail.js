const nodemailer = require('nodemailer');
const path = require('path');


const sendEmail = async (to, subject, text, html, attachments_path) => {
  try {
    
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
      }
    });
  
    let mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: to,                       // List of receivers
      subject: subject,             // Subject line
      text: text,                   // Plain text body
      html: html,                   // HTML body    
    };

    if(attachments_path){
      mailOptions.attachments = [
        {
            filename: path.basename(attachments_path),
            path: attachments_path,
        }
      ]   
    }
    
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }

    });
  } catch (e) {
    throw new Error('Error sending message');
  }
  
};

module.exports = { sendEmail };