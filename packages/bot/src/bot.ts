import { CoreService } from "@stock-bot/modules";

const coreService = new CoreService();

let symbols = [
  "amd",
  "qqq",
  "mlnt",
  "msft",
  "siri",
  "mu",
  "axgt",
  "work",
  "orcl",
  "nio",
  "xlf",
  "bbva",
  "googl",
  "aapl",
  "fb",
  "amzn"
];

async function tick() {
  let orders: any = await coreService.getOrders();
  let positions: any = await coreService.getPositions();

  symbols.forEach(async s => {
    try {
      let price: any = await coreService.getSymbolPrice(s);
      let order: any = fetchSymbolFromList(orders, s);
      let position: any = fetchSymbolFromList(positions, s);

      if (position && !order) {
        console.log(
          `Selling [${s.toUpperCase()}] for [$${(price + 0.02).toFixed(2)}].`
        );

        let body = {
          symbol: s.toUpperCase(),
          qty: position.qty,
          side: "sell",
          type: "stop_limit",
          stop_price: price + 0.02,
          limit_price: price + 0.02,
          time_in_force: "day"
        };

        await coreService.symbolTransaction(s, body);
        return;
      } else if (!position && !order) {
        console.log(
          `Buying [${s.toUpperCase()}] for [$${(price - 0.02).toFixed(2)}].`
        );

        let body = {
          symbol: s.toUpperCase(),
          side: "buy",
          qty: 1,
          type: "stop_limit",
          stop_price: price - 0.02 > 0 ? price - 0.02 : price,
          limit_price: price - 0.02 > 0 ? price - 0.02 : price,
          time_in_force: "day"
        };

        await coreService.symbolTransaction(s, body);
        return;
      }
    } catch (err) {
      console.log("Failed to act on: ", s);
    }
  });
}

function fetchSymbolFromList(list: any[], symbol) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].symbol === symbol.toUpperCase()) return list[i];
  }

  return null;
}

setInterval(tick, 5000);
