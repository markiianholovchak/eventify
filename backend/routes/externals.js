const express = require("express");
const {
	getEvents,
	getEvent,
	getVenues,
	getVenue,
	getAttraction,
	getAttractions,
} = require("../controllers/externalsController");

const router = express.Router();

// Get all events
router.get("/events/:page", getEvents);

// Get single event
router.get("/event/:id", getEvent);

// Get all venues
router.get("/venues/:page", getVenues);

// Get single venue
router.get("/venue/:id", getVenue);

// Get all attractions
router.get("/attractions/:page", getAttractions);

// Get single attraction
router.get("/attraction/:id", getAttraction);

module.exports = router;
