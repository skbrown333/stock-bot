import axios from "./axios.instance";

let symbols = [
  "aapl",
  "fb",
  "googl",
  "chma",
  "pays",
  "axsm",
  "iipr",
  "roku",
  "nssc"
];

async function tick() {
  symbols.forEach(async s => {
    try {
      let purchased: any = await axios.post(`/symbol/purchased`, { symbol: s });
      let price: any = await axios.get(`/symbol/${s}`);
      let position: any = await axios.get(`/symbol/${s}/position`);
      let order: any = null;

      // TODO:
      if (position && !purchased) {
      }

      if (purchased && purchased.order) {
        order = await axios.get(`/symbol/order/${purchased.order}`);
      }

      if (order) console.log(order);

      if (position && position.qty && purchased) {
        if (purchased.purchase_price < price.value) {
          console.log("Selling: ", s);
          await axios.post(`/symbol/${s}/sell`);
        }
      } else if ((!position || !position.qty) && !order) {
        if (!purchased || purchased.purchase_price > price.value) {
          console.log("Buying: ", s);
          await axios.post(`/symbol/${s}/purchase`);
        }
      }
    } catch {
      console.log("Failed to act on: ", s);
    }
  });
}

setInterval(tick, 5000);
