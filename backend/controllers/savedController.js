const Saved = require("../models/savedModel");
const getItems = async (req, res) => {
	const user_id = req.user._id;

	try {
		const savedItems = await Saved.find({ user_id });

		res.status(200).json({ savedItems });
	} catch (error) {
		res.status(400).json({ error });
	}
};

const saveItem = async (req, res) => {
	const user_id = req.user._id;

	const { id, type, name, location, date, image, segment, upcoming } = req.body;
	const item = await Saved.findOne({ id });
	if (item) {
		return res.status(400).json({ error: "Item is already saved!" });
	}
	try {
		const savedItem = await Saved.create({
			user_id,
			id,
			type,
			name,
			location,
			date,
			image,
			segment,
			upcoming: String(upcoming),
		});
		res.status(200).json({ savedItem });
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const deleteItem = async (req, res) => {
	const { id } = req.params;
	const item = await Saved.findOneAndDelete({ id });
	if (!item) {
		res.status(400).json({ error: "No such item!" });
	}
	res.status(200).json({ item });
};

module.exports = {
	getItems,
	saveItem,
	deleteItem,
};
