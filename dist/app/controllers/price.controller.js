"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var price_1 = require("../price");
exports.getCurrentPrice = function (req, res) {
    (0, price_1.calculatePriceClient)(function (err, data) {
        if (err) {
            console.log("error: ", err);
            res(err, null);
            return;
        }
        else {
            res.send({
                success: true,
                data: data,
            });
            return;
        }
    });
};
//# sourceMappingURL=price.controller.js.map