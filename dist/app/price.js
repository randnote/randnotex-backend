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
exports.calculatePriceSocket = exports.calculatePriceClient = void 0;
var axios_1 = __importDefault(require("axios"));
var __1 = require("..");
var PRICE = 1000;
var CURRENT_SUPPLY = 100; // careful buddy, this starting supply can cause infite numbers if not set correctly
var BUYING_PERCENTAGE_INCREASE = 101.8;
var SELLING_PERCENTAGE_DECREASE = 99;
var MINING_PERCENTAGE_DECREASE = 99; // reduce price by 1 percent
/*
    THIS FILE IS VERY IMPORTANT:
    - we re calculate price whenever there is a mine...
    - we re calculate price whenever there is a buy... and sell too.
    - CURRENT_SUPPLY just keeps track of the overall supply of the blockchains notes out in the public....

    THEREFORE: if you ever want to display the supply, you can either give user the CURRENT_SUPPLY
    or you can look in the blockchain itself. !
*/
var calculatePriceSocket = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, PRICE];
    });
}); };
exports.calculatePriceSocket = calculatePriceSocket;
var calculatePriceClient = function (result) { return __awaiter(void 0, void 0, void 0, function () {
    var NEW_SUPPLY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSupply()];
            case 1:
                NEW_SUPPLY = _a.sent();
                console.log("new supply is : " + NEW_SUPPLY);
                // this doesnt do anything, it just makes sure that the supply is never below 100;
                if (NEW_SUPPLY === 0) {
                    NEW_SUPPLY = 100;
                    result(null, PRICE);
                    return [2 /*return*/];
                }
                console.log("current supply is : " +
                    CURRENT_SUPPLY +
                    ". New supply is: " +
                    NEW_SUPPLY);
                if (CURRENT_SUPPLY !== NEW_SUPPLY) {
                    // leave the supply out , since it messes up the equation:
                    // let s: number = CURRENT_SUPPLY / NEW_SUPPLY;
                    // s = s * MINING_PERCENTAGE_DECREASE;
                    PRICE = (PRICE * MINING_PERCENTAGE_DECREASE) / 100;
                    console.log({
                        // s: s,
                        price: PRICE,
                        CURRENT_SUPPLY: CURRENT_SUPPLY,
                        NEW_SUPPLY: NEW_SUPPLY,
                    });
                    console.log("Price is = " + PRICE);
                    CURRENT_SUPPLY = NEW_SUPPLY;
                    result(null, PRICE);
                    return [2 /*return*/];
                }
                else {
                    result(null, PRICE);
                    return [2 /*return*/];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.calculatePriceClient = calculatePriceClient;
// this function just calls the blockchain to get the number of notes in circulation
var getSupply = function () { return __awaiter(void 0, void 0, void 0, function () {
    var supply;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                supply = 0;
                // remember to add env variable here...
                return [4 /*yield*/, axios_1.default.get("".concat(__1.BLOCKCHAIN_API, "/supply"))
                        .then(function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, response.data.supply];
                                case 1:
                                    supply = _a.sent();
                                    return [2 /*return*/, supply];
                            }
                        });
                    }); })
                        .catch(function (err) {
                        console.log(err);
                    })];
            case 1:
                // remember to add env variable here...
                _a.sent();
                return [2 /*return*/, supply];
        }
    });
}); };
var calculatePrice = function (buy_sell, buy_sell_value) { return __awaiter(void 0, void 0, void 0, function () {
    var returnedPrice, buy_sellVal, buy_sell_valueVal;
    return __generator(this, function (_a) {
        returnedPrice = 0;
        buy_sellVal = buy_sell;
        buy_sell_valueVal = buy_sell_value;
        // means that we have a buy order.. so increase price:
        calculatePriceClient(function (err, data) {
            if (err) {
                console.log("error: ", err);
                return;
            }
            else {
                if (buy_sell == true) {
                    // buy order... increase price:
                    // easy way to calculate price:
                    PRICE = (data * BUYING_PERCENTAGE_INCREASE) / 100;
                    returnedPrice = PRICE;
                    console.log("Price is = " + PRICE);
                    return returnedPrice;
                }
                else if (buy_sell == false) {
                    // sell order... decrease price:
                    /*
                        Here, i try to control price.
                        When price gets too high, increase the value at which a sell would influence the price!
                    */
                    if (PRICE > 2000) {
                        SELLING_PERCENTAGE_DECREASE = 50;
                    }
                    else {
                        SELLING_PERCENTAGE_DECREASE = 99;
                    }
                    PRICE = (data * SELLING_PERCENTAGE_DECREASE) / 100;
                    console.log("Price is = " + PRICE);
                    returnedPrice = PRICE;
                    return returnedPrice;
                }
                return;
            }
        });
        return [2 /*return*/];
    });
}); };
exports.default = calculatePrice;
//# sourceMappingURL=price.js.map