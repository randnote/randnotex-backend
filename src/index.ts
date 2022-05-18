#!/usr/bin/env nodejs:
import express, { Application, Request, Response, NextFunction } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();
const socketIo = require("socket.io");
const http = require("http");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
var allowedOrigins = [
	"http://localhost:3000", 
	"http://locahost:3000/admin",
	"http://localhost:3000/signup",
	"http://localhost:3000/signin",
	"http://localhost:3000/dashboard"
];
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
let interval;

const server = http.createServer(app);
const io = require("socket.io")(server, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"]
	}
  });



io.on("connection", (socket: any) => {
	console.log("New client connected");
	if (interval) {
	  clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on("disconnect", () => {
	  console.log("Client disconnected");
	  clearInterval(interval);
	});
  });

  const getApiAndEmit = socket => {
	const response = new Date();
	// Emitting a new message. Will be consumed by the client
	socket.emit("FromAPI", response);
  };

require("./app/config/createTables");
require("./app/routes/index.routers")(app);

// require('./app/emails/signup.email')
server.listen(8024, () => console.log(`server started on port 8024`));
