#!/usr/bin/env nodejs:
import express, { Application, Request, Response, NextFunction } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();
// import send from "./app/emails";

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

var allowedOrigins = ["http://localhost:3000", "http://locahost:3000/admin"];

app.use(
	cors({
		origin: function (origin: any, callback: any) {
			// allow requests with no origin
			// (like mobile apps or curl requests)
			if (!origin) {
				return callback(null, true);
			}

			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin.";
				// return callback(new Error(msg), false);
				return callback(null, true); // allow all of em
			}
			return callback(null, true);
		},
	})
);

require("./app/config/createTables");
require("./app/routes/index.routers")(app);
// require("./app/routes/teachers.routers")(app);
// require("./app/routes/students.routers")(app);
// require("./app/routes/modules.routers")(app);
// require("./app/emails/admins/login.email"); // still buggy

// require('./app/emails/signup.email')
app.listen(8024, () => console.log(`server started on port 8024`));
