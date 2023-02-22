import { Application, Request, Response, NextFunction } from "express";
import { calculatePriceClient } from "../price";


exports.getCurrentPrice = (req:any, res: any) => {
	calculatePriceClient((err: any, data: any) => {
		res.send(data);
	});
  
}
