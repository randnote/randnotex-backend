#!/usr/bin/env nodejs:
import express, { Application, Request, Response, NextFunction } from "express";
require('dotenv').config()

// set environmental variables
let BLOCKCHAIN_API:string = '' 
let FRONTEND_API:string = '' 
let BACKEND_API:string = '' 
if (process.env.NODE_ENV == 'development') {
	 BLOCKCHAIN_API = 'http://localhost:8033' 
	 FRONTEND_API = 'http://localhost:3002' 
	 BACKEND_API = 'http://localhost:8024'
} else if(process.env.NODE_ENV == 'production'){
	BLOCKCHAIN_API = 'https://blockchain.randnotex.co.za' 
	FRONTEND_API = 'https://randnotex.co.za' 
	BACKEND_API = 'https://server.randnotex.co.za'
}


import calculatePrice, {
	calculatePriceClient,
	calculatePriceSocket,
} from "./app/price";
const cors = require("cors");
const bodyParser = require("body-parser");
const app: Application = express();
const socketIo = require("socket.io");
const http = require("http");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
var allowedOrigins = [
	`${FRONTEND_API}`,
	`${FRONTEND_API}/admin`,
	`${FRONTEND_API}/signup`,
	`${FRONTEND_API}/signin`,
	`${FRONTEND_API}/dashboard`,
	`${FRONTEND_API}/deposit`
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
		origin: [`${FRONTEND_API}`, `${FRONTEND_API}/chart` ],
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket: any) => {
	console.log("New client connected");
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 2000);
	socket.on("disconnect", () => {
		console.log("Client disconnected");
		clearInterval(interval);
	});
});

const getApiAndEmit = async (socket: any) => {
	// const response = new Date();
	const response = await calculatePriceSocket();
	let time: Date = new Date();

	// Emitting a new message. Will be consumed by the client
	socket.emit("FromAPI", {
		price: response,
		time: {
			year: time.getFullYear(),
			month: time.getMonth(),
			day: time.getDay(),
			hours: time.getHours(),
			minutes: time.getMinutes(),
			seconds: time.getSeconds(),
		},
	});
};

export {BLOCKCHAIN_API, FRONTEND_API, BACKEND_API};

require("./app/config/createTables");
require("./app/routes/index.routers")(app);



// require('./app/emails/signup.email')
server.listen(8024, () => console.log(`server started on port 8024`));
