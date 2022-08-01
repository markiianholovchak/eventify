const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: "String",
		required: true,
		unique: true,
	},
	password: {
		type: "String",
		required: true,
	},
});

userSchema.statics.login = async function (email, password) {
	// Input validation
	if (!email) {
		throw Error("Email is required");
	}
	if (!password) {
		throw Error("Password is required");
	}
	if (!validator.isEmail(email)) {
		throw Error("Invalid email");
	}
	const user = await this.findOne({ email });
	if (user) {
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		} else {
			throw Error("Incorrect password");
		}
	} else {
		throw Error("Account does not exist");
	}
};

userSchema.statics.signup = async function (email, password) {
	// Input validation
	if (!email) {
		throw Error("Email is required");
	}
	if (!password) {
		throw Error("Password is required");
	}
	if (!validator.isEmail(email)) {
		throw Error("Invalid email");
	}

	const exists = await this.findOne({ email });
	if (exists) {
		throw Error("Email already in use");
	}
	// Disabled for testing
	// if (!validator.isStrongPassword(password)) {
	// 	throw Error("Password not strong enough");
	// }

	// Hash the password
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
	const user = await this.create({ email, password: hash });
	return user;
};

module.exports = mongoose.model("user", userSchema);
