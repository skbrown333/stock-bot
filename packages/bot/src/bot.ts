import IEXService from "@stock-bot/modules";
console.log("IEXService: ", IEXService);

async function test() {
  let s = await IEXService.getSymbolQuote("aapl");
  console.log(s);
}

console.log("Hello World");
test();
