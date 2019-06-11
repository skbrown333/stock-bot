import axios from "./axios.instance";

/* Types */
import { Service } from "../Types/service";

class IEXService implements Service {
  constructor() {}

  async getAllSymbols() {
    let res = await axios.get(
      "/ref-data/symbols?filter=symbol&token=sk_a3bb6a75aa7c43c894e2c7a2e92d5387"
    );
    return res.data;
  }

  async getSymbolQuote(symbol: string, filters: any) {
    let query = filterToQuery(filters);
    let url = `/stock/${symbol}/price?token=sk_a3bb6a75aa7c43c894e2c7a2e92d5387`;
    let res: any = await axios.get(url);
    return res.data;
  }
}

export default new IEXService();

function filterToQuery(filter: Object) {}
