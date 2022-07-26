const axios = require("axios");
// Events
const getEvents = async (req, res) => {
	const { page } = req.params;
	const { q } = req.query;
	try {
		const response = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events?apikey=${
				process.env.APIKEY
			}&${q && q + "&"}locale=*&page=${page ? page : "1"}`
		);
		res.status(200).json({ data: response.data });
	} catch (error) {
		console.log(error);
		res.status(401).json({ error });
	}
};
const getEvent = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${process.env.APIKEY}&locale=*`
		);
		res.status(200).json({ data: response.data });
	} catch (error) {
		res.status(401).json({ error });
	}
};

// Venues
const getVenues = async (req, res) => {
	const { page } = req.params;
	const { q } = req.query;
	try {
		const response = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/venues?apikey=${
				process.env.APIKEY
			}&${q && q + "&"}locale=*&page=${page ? page : "1"}`
		);
		res.status(200).json({ data: response.data });
	} catch (error) {
		res.status(401).json({ error });
	}
};
const getVenue = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/venues/${id}?apikey=${process.env.APIKEY}&locale=*`
		);
		res.status(200).json({ data: response.data });
	} catch (error) {
		res.status(401).json({ error });
	}
};

// Attractions
const getAttractions = async (req, res) => {
	const { page } = req.params;
	const { q } = req.query;
	try {
		const response = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/attractions?apikey=${
				process.env.APIKEY
			}&${q && q + "&"}locale=*&page=${page ? page : "1"}`
		);
		res.status(200).json({ data: response.data });
	} catch (error) {
		res.status(401).json({ error });
	}
};

const getAttraction = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await axios.get(
			`https://app.ticketmaster.com/discovery/v2/attractions/${id}?apikey=${process.env.APIKEY}&locale=*`
		);
		res.status(200).json({ data: response.data });
	} catch (error) {
		res.status(401).json({ error });
	}
};

module.exports = {
	getEvent,
	getEvents,
	getVenues,
	getVenue,
	getAttraction,
	getAttractions,
};
