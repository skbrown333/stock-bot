import axios from "axios";

let symbols = [
  "aapl",
  "fb",
  "ntdoy",
  "googl",
  "chma",
  "pays",
  "axsm",
  "iipr",
  "roku",
  "nssc"
];
let money: number = 100000;
console.log("---------------------------------------");
console.log(`Total: $${money.toFixed(2)}`);
console.log("---------------------------------------\n");

async function tick() {
  let purchased = await axios.get(`http://localhost:3000/symbol/purchased`);
  symbols.forEach(async s => {
    let price: any = await axios.get(`http://localhost:3000/symbol/${s}`);
    if (money < price.data.price) return;
    let p = purchasedSymbol(s, purchased.data);
    if (p) {
      if (p.purchase_price < price.data.price) {
        let saleData = await axios.post(
          `http://localhost:3000/symbol/${s}/sell`
        );
        console.log("---------------------------------------");
        console.log(
          `Sold: ${s} for ${saleData.data.total} | +${(
            price.data.price - p.purchase_price
          ).toFixed(2)}`
        );
        console.log("---------------------------------------\n");
        money += saleData.data.total;
        console.log("---------------------------------------");
        console.log(`Total: $${money.toFixed(2)}`);
        console.log("---------------------------------------\n");
      }
    } else {
      await axios.post(`http://localhost:3000/symbol/${s}/purchase`);
      console.log("---------------------------------------");
      console.log(`Purchased: ${s} for ${price.data.price}`);
      console.log("---------------------------------------\n");
      money -= price.data.price;
      console.log("---------------------------------------");
      console.log(`Total: $${money.toFixed(2)}`);
      console.log("---------------------------------------\n");
    }
  });
}

function purchasedSymbol(symbol: String, purchased) {
  for (let i = 0; i < purchased.length; i++) {
    let p = purchased[i];
    if (p.symbol === symbol) return p;
  }
  return null;
}

setInterval(tick, 1000);
