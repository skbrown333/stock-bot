import { IEXService, AlpacaService } from "@stock-bot/modules";
import Symbol from "../../models/Symbol";

const iex = new IEXService(process.env.IEX_TOKEN);
const alpaca = new AlpacaService({
  "APCA-API-KEY-ID": process.env.ALPACA_ID,
  "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET
});

interface ISymbolController {
  getPosition: Function;
  getPrice: Function;
  getPurchased: Function;
  getHistorical: Function;
  getQuote: Function;
  purchaseSymbol: Function;
  sellSymbol: Function;
}

class SymbolController implements ISymbolController {
  constructor() {}

  async getPosition(req, res) {
    let symbol = req.params.symbol;
    try {
      let position = await alpaca.getPosition(symbol);
      res.send(position);
    } catch {
      res.send(null);
    }
  }

  async getPrice(req, res) {
    let symbol = req.params.symbol;
    let price = await iex.getSymbolPrice(symbol, null);
    res.send({ value: price });
  }

  async getPurchased(req, res) {
    let params = req.body || {};
    let symbol = await Symbol.findOne(params);
    res.send(symbol);
  }

  async getHistorical(req, res) {
    let params = req.body || {};
    let symbol = req.params.symbol;
    let range = params.range || "1m";

    let data = await iex.getHistorical(symbol, range, null);
    res.send(data);
  }

  async getQuote(req, res) {
    let symbol = req.params.symbol;
    let quote = await iex.getSymbolQuote(symbol, null);
    res.send(quote);
  }

  async purchaseSymbol(req, res) {
    let symbol = req.params.symbol;

    let order = await alpaca.requestMarketOrder(symbol, null);
    console.log("order: ", order);
    let purchasePrice = await iex.getSymbolPrice(symbol, null);

    let model = await Symbol.findOne({ symbol });
    if (!model) {
      let stock = await iex.getSymbolQuote(symbol, null);
      let purchaseDate = new Date().toDateString();
      let newModel = await Symbol.create({
        symbol: stock.symbol.toLowerCase(),
        name: stock.companyName,
        purchase_date: purchaseDate,
        purchase_price: purchasePrice,
        order: order
      });

      res.send(newModel);
      return;
    }

    res.send(model);
  }

  async sellSymbol(req, res) {
    let symbol = req.params.symbol;
    let position = await alpaca.getPosition(symbol);
    let order = await alpaca.requestMarketOrder(req.params.symbol, {
      side: "sell",
      qty: position.qty
    });
    await Symbol.findOneAndUpdate({ symbol }, { order: order });
    res.send(order);
  }
}

export default new SymbolController();
