import { IEXService } from "@stock-bot/modules";
import Symbol from "../../models/Symbol";

interface ISymbolController {
  getPrice: Function;
  getHistorical: Function;
  getQuote: Function;
  purchaseSymbol: Function;
  getPurchased: Function;
  sellSymbol: Function;
}

class SymbolController implements ISymbolController {
  constructor() {}

  async getPrice(req, res) {
    let symbol = req.params.symbol;
    let price = await IEXService.getSymbolPrice(symbol, null);
    res.send({ price: price });
  }

  async getHistorical(req, res, next) {
    let params = req.body || {};
    let symbol = req.params.symbol;
    let range = params.range || "1m";

    let data = await IEXService.getHistorical(symbol, range, null);
    res.send(data);
  }

  async getQuote(req, res) {
    let symbol = req.params.symbol;
    let quote = await IEXService.getSymbolQuote(symbol, null);
    res.send(quote);
  }

  async purchaseSymbol(req, res) {
    let stock = await IEXService.getSymbolQuote(req.params.symbol, null);
    let purchasePrice = await IEXService.getSymbolPrice(
      req.params.symbol,
      null
    );
    let purchaseDate = new Date().toDateString();
    let model = await Symbol.create({
      symbol: stock.symbol.toLowerCase(),
      name: stock.companyName,
      purchase_date: purchaseDate,
      purchase_price: purchasePrice
    });
    res.send(model);
  }

  async getPurchased(req, res) {
    let symbols = await Symbol.find();
    res.send(symbols);
  }

  async sellSymbol(req, res) {
    let symbol = req.params.symbol;
    let price = await IEXService.getSymbolPrice(symbol, null);
    let models = await Symbol.deleteMany({ symbol: symbol });
    res.send({
      count: models.n,
      price: price,
      total: price * models.n
    });
  }
}

export default new SymbolController();
