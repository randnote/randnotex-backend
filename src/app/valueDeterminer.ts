import calculatePrice from "./price";

exports.valueDeterminer = (req: any, res: any) => {
    calculatePrice().then((price) => {
        let amount = req.params.amount;
        let value = amount / price;
        res.send(value);
    });
};
