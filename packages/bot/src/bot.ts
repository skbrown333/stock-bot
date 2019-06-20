import axios from "axios";

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
    let purchased: any = await axios.post(
      `http://localhost:3000/symbol/purchased`,
      { symbol: s }
    );
    purchased = purchased.data;
    let price: any = await axios.get(`http://localhost:3000/symbol/${s}`);
    price = price.data.price;
    let position: any;
    try {
      position = await axios.get(`http://localhost:3000/symbol/${s}/position`);
    } catch {
      position = null;
    }
    let order: any = null;
    try {
      if (purchased && purchased.order) {
        order = await axios.get(
          `http://localhost:3000/symbol/order/${purchased.order}`
        );
      }
    } catch {}

    if (order) console.log(order);

    if (position && position.qty && purchased) {
      if (purchased.purchase_price < price.price) {
        console.log("selling");
        await axios.post(`http://localhost:3000/symbol/${s}/sell`);
      }
    } else if ((!position || !position.qty) && !order) {
      if (!purchased || purchased.purchase_price > price.price) {
        console.log("buying");
        await axios.post(`http://localhost:3000/symbol/${s}/purchase`);
      }
    }
  });
}

setInterval(tick, 1000);
