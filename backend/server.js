const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const externalsRoutes = require("./routes/externals");
const usersRoutes = require("./routes/users");

const app = express();

// middleware
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Routes

app.use("/api/external", externalsRoutes);
app.use("/api/user", usersRoutes);

// connect to db
mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		console.log("Connected to db successfuly");
		// start listening to requests
		app.listen(process.env.PORT, () => {
			console.log(`Listening on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
