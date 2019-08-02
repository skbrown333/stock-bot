import axios from "./axios.instance";

/* Types */
import { IEXServiceInterface } from "../Types/iex-service";

export default class IEXService implements IEXServiceInterface {
  token: string;
  constructor(token: string) {
    this.token = token;
    // sk_a3bb6a75aa7c43c894e2c7a2e92d5387
  }

  async getAllSymbols() {
    let res = await axios.get(
      `/ref-data/symbols?filter=symbol&token=${this.token}`
    );
    return res.data;
  }

  async getSymbolPrice(symbol: string, filters: any) {
    try {
      let query = filterToQuery(filters);
      let url = `/stock/${symbol}/price?token=${this.token}`;
      let res: any = await axios.get(url);
      return res.data;
    } catch (err) {
      return err;
    }

  }

  async getHistorical(symbol: string, range: string, filters: any) {
    let query = filterToQuery(filters);
    let url = `/stock/${symbol}/chart/${range}?token=${this.token}`;
    let res: any = await axios.get(url);
    return res.data;
  }

  async getSymbolQuote(symbol: string, filters: any) {
    let query = filterToQuery(filters);
    let url = `/stock/${symbol}/quote?token=${this.token}`;
    let res: any = await axios.get(url);
    return res.data;
  }
}

function filterToQuery(filter: Object) {}
