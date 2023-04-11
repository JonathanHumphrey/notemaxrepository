const express = require("express");
const path = require("path");
const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const userRoutes = require("./routes/userRoutes.js");
const fileRoutes = require("./routes/fileRoutes.js");

const { uploadFile } = require("./controllers/fileController");

const app = express();
dotenv.config();
connectDB();

// connected the logger to the connection of the DB to keep track of failure to connect - JH
app.use(errorHandler);
app.use(logger);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
// Allows the server to have a basic landing page for development - JH
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", require("./routes/root"));

app.post("/upload", uploadFile);

const PORT = 4500;

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
});

mongoose.connection.on("error", (err) => {
	console.log(err);
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		"mongoErrLog.log"
	);
});
