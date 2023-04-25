const nodemailer = require("nodemailer");

const sendEmail = async (email, resetLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host:'smpt.gmail.com',
            port:465,
            secure:true,
            auth: {
                user: "77320jay@gmail.com",
                pass: "awgeoopxzxjmzvps",
            }
        });
        await transporter.sendMail({
            from: "77320jay@gmail.com",
            to: email,
            subject: "Reset your password",
            // text:resetLink,
            html: resetLink
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;