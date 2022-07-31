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

module.exports = {
	getItems,
	saveItem,
};
