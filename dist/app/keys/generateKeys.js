"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var elliptic_1 = __importDefault(require("elliptic"));
var EC = elliptic_1.default.ec;
var ec = new EC("secp256k1");
var generateKeys = function () {
    var key = ec.genKeyPair();
    var publicKey = key.getPublic("hex");
    var privateKey = key.getPrivate("hex");
    return {
        publicKey: publicKey,
        privateKey: privateKey,
    };
};
exports.default = generateKeys;
//# sourceMappingURL=generateKeys.js.map