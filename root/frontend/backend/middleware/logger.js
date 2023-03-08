const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Assembles an event at the time it is caught by the logger - JH
const logEvents = async (message, logFileName) => {
	const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!fs.existsSync(path.koin(__dirname, "..", "logs"))) {
			await fsPromises.mkdir(path.koin(__dirname, "..", "logs"));
		}
		await fsPromises.appendFile(
			path.join(__dirname, "..", "logs", logFileName),
			logItem
		);
	} catch (err) {
		console.log(err);
	}
};

// Actually logs the event in a .txt file in the logs directory - JH
const logger = (req, res, next) => {
	logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
	console.log(`${req.method} ${req.path}`);
	next();
};

module.exports = { logEvents, logger };
