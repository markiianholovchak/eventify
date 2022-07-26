const express = require("express");
require("dotenv").config();
const cors = require("cors");
const externalsRoutes = require("./routes/externals");

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

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
