import { IEXService } from "@stock-bot/modules";

async function test() {
  let s = await IEXService.getSymbolQuote("aapl", null);
  console.log(s);
}

test();
