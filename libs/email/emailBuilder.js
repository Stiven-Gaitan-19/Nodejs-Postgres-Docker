const EmailSender = require('./emailSender');

class EmailBuilder {
	#to = null;
	#subject = null;
	#text = null;
	#html = null;

	constructor() {}

	setTo(to) {
		this.#to = to;
		return this;
	}

	setSubject(subject) {
		this.#subject = subject;
		return this;
	}

	setText(text) {
		this.#text = text;
		return this;
	}

	setHtml(html) {
		this.#html = html;
		return this;
	}

	build() {
		let params = {
			to: this.#to,
			subject: this.#subject,
		};
		if (this.#html) {
			params.html = this.#html;
		}
		if (this.#text) {
			params.text = this.#text;
		}
		return new EmailSender(params);
	}
}

module.exports = EmailBuilder;