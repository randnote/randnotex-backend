#!/usr/bin/env nodejs:
import express, { Application, Request, Response, NextFunction } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();
const socketIo = require("socket.io");
const http = require("http");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
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
