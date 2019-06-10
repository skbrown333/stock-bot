import { IEXService } from "@stock-bot/modules";

async function test() {
  let s = await new IEXService().getSymbolQuote("aapl", null);
  console.log(s);
}

console.log("Hello World");
test();
