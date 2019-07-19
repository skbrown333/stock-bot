import { AlpacaService } from "@stock-bot/modules";

const alpaca = new AlpacaService({
  "APCA-API-KEY-ID": process.env.ALPACA_ID,
  "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET
});

interface IOrderController {
  getOrder: Function;
  getOrders: Function;
}

class OrderController implements IOrderController {
  constructor() {}

  async getOrder(req, res) {
    let id = req.params.order;
    try {
      let order = await alpaca.getOrder(id);
      res.send(order);
    } catch {
      res.send(null);
    }
  }

  async getOrders(req, res) {
    let orders = await alpaca.getOrders(req.query);
    res.send(orders);
  }
}

export default new OrderController();
