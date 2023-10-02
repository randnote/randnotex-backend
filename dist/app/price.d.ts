declare const calculatePriceSocket: () => Promise<number>;
declare const calculatePriceClient: (result: any) => Promise<void>;
declare const calculatePrice: (buy_sell?: boolean, buy_sell_value?: number) => Promise<void>;
export default calculatePrice;
export { calculatePriceClient, calculatePriceSocket };
