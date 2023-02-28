import { Application, Request, Response, NextFunction } from "express";
import { calculatePriceClient } from "../price";

exports.getCurrentPrice = (req: any, res: any) => {
	calculatePriceClient((err: any, data: any) => {
		
		if (err) {
			console.log("error: ", err);
			res(err, null);
			return;
		} else {
			res.send({
				success: true,
				data: data,
			});
			return;
		}
	});
};
