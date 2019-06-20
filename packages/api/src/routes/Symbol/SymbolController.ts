import { IEXService, AlpacaService } from "@stock-bot/modules";
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

  async getHistorical(req, res) {
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
    let symbol = req.params.symbol;
    let order = await AlpacaService.requestMarketOrder(symbol, null);
    console.log("order: ", order);
    let purchasePrice = await IEXService.getSymbolPrice(symbol, null);

    let model = await Symbol.findOne({ symbol });
    if (!model) {
      let stock = await IEXService.getSymbolQuote(symbol, null);
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

  async getPurchased(req, res) {
    let params = req.body || {};
    let symbol = await Symbol.findOne(params);
    res.send(symbol);
  }

  async sellSymbol(req, res) {
    let symbol = req.params.symbol;
    let position = await AlpacaService.getPosition(symbol);
    let order = await AlpacaService.requestMarketOrder(req.params.symbol, {
      side: "sell",
      qty: position.qty
    });
    await Symbol.findOneAndUpdate({ symbol }, { order: order });
    res.send(order);
  }

  async getPosition(req, res) {
    let symbol = req.params.symbol;
    let position = await AlpacaService.getPosition(symbol);
    res.send(position);
  }

  async getOrder(req, res) {
    let id = req.params.order;
    let order = await AlpacaService.getOrder(id);
    res.send(order);
  }
}

export default new SymbolController();
