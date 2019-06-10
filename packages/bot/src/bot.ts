import { IEXService } from "@stock-bot/modules";

async function test() {
  let s = await IEXService.getSymboleQuote("aapl");
  console.log(s);
}

console.log("Hello World");
test();
