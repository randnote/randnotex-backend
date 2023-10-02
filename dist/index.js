#!/usr/bin/env nodejs:
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BACKEND_API = exports.FRONTEND_API = exports.BLOCKCHAIN_API = void 0;
var express_1 = __importDefault(require("express"));
require("dotenv").config();
// set environmental variables
var BLOCKCHAIN_API = "";
exports.BLOCKCHAIN_API = BLOCKCHAIN_API;
var FRONTEND_API = "";
exports.FRONTEND_API = FRONTEND_API;
var BACKEND_API = "";
exports.BACKEND_API = BACKEND_API;
if (process.env.NODE_ENV == "development") {
    exports.BLOCKCHAIN_API = BLOCKCHAIN_API = "http://localhost:8034";
    exports.FRONTEND_API = FRONTEND_API = "http://localhost:3002";
    exports.BACKEND_API = BACKEND_API = "http://localhost:8024";
}
else if (process.env.NODE_ENV == "production") {
    exports.BLOCKCHAIN_API = BLOCKCHAIN_API = "https://blockchain.randnotex.co.za";
    exports.FRONTEND_API = FRONTEND_API = "https://randnotex.co.za";
    exports.BACKEND_API = BACKEND_API = "https://backend.randnotex.co.za";
}
var price_1 = require("./app/price");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = (0, express_1.default)();
var socketIo = require("socket.io");
var http = require("http");
app.use(bodyParser.json());
app.use(express_1.default.urlencoded({ extended: false }));
var allowedOrigins = [
    "".concat(FRONTEND_API),
    "".concat(FRONTEND_API, "/admin"),
    "".concat(FRONTEND_API, "/signup"),
    "".concat(FRONTEND_API, "/signin"),
    "".concat(FRONTEND_API, "/dashboard"),
    "".concat(FRONTEND_API, "/deposit"),
];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not " +
                "allow access from the specified Origin.";
            // return callback(new Error(msg), false);
            return callback(null, true); // allow all of em
        }
        return callback(null, true);
    },
}));
var interval;
var server = http.createServer(app);
var io = require("socket.io")(server, {
    cors: {
        origin: ["".concat(FRONTEND_API), "".concat(FRONTEND_API, "/chart")],
        methods: ["GET", "POST"],
    },
});
io.on("connection", function (socket) {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(function () { return getApiAndEmit(socket); }, 2000);
    socket.on("disconnect", function () {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});
var getApiAndEmit = function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var response, time;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, price_1.calculatePriceSocket)()];
            case 1:
                response = _a.sent();
                time = new Date();
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
                return [2 /*return*/];
        }
    });
}); };
// require("./app/config/createTables");
// require("./app/routes/index.routers")(app);
// require('./app/emails/signup.email')
server.listen(8024, function () { return console.log("server started on port 8024"); });
//# sourceMappingURL=index.js.map