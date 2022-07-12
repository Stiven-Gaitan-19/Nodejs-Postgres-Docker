const nodemailer = require('nodemailer');
require('dotenv').config();

class EmailSender {
	#transporter;

	constructor(email) {
		this.#transporter = this.#configureTranporter();
		this.email = email;
	}

	#configureTranporter() {
		return nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: process.env.EMAIL_USER, // generated ethereal user
				pass: process.env.EMAIL_PASSWORD, // generated ethereal password
			},
		});
	}

	sendEmail() {
		this.email.from = process.env.EMAIL_USER;
		return this.#transporter.sendMail(this.email);
	}
}

module.exports = EmailSender;
