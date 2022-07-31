const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const savedSchema = new Schema({
	user_id: {
		type: "String",
		required: true,
	},
	id: {
		type: "String",
		required: true,
		unique: true,
	},
	type: {
		type: "String",
		required: true,
	},
	name: {
		type: "String",
		required: true,
	},
	location: {
		type: "String",
		required: false,
	},
	image: {
		type: "String",
		required: true,
	},
	date: {
		type: "String",
		required: false,
	},
	upcoming: {
		type: "String",
		required: false,
	},
	segment: {
		type: "String",
		required: false,
	},
});

module.exports = mongoose.model("saved_item", savedSchema);
