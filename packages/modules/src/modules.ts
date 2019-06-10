import axios from "./Services/axios.instance";

/* Types */
import { Service } from "./Types/service";

export class IEXService implements Service {
  constructor() {}

  async getSymbolQuote(symbol: string, filters) {
    let query = filterToQuery(filters);
    let url = `/stock/${symbol}/quote?token=sk_a3bb6a75aa7c43c894e2c7a2e92d5387`;
    let stock: Symbol = await axios.get(url);
    return stock;
  }
}

function filterToQuery(filter: Object) {}

export class asd {
  constructor(public name: String) {
    this.name = "steffan";
  }
}
