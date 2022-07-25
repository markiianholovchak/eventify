const express = require("express");
require("dotenv").config();

// middleware
app.use(express.json());

const app = express();

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
