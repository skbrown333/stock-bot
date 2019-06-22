import axiosLib from "axios";

const baseUrl = "https://paper-api.alpaca.markets/v2";

const axios = axiosLib.create({
  baseURL: baseUrl,
  timeout: 300000
});

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    console.log("error: ", error);
    // Do something with the response error
    return Promise.reject();
  }
);

/* Types */
import {
  AlpacaServiceInterface,
  AlpacaServiceHeader
} from "../Types/alpaca-service";

export default class AlpacaService implements AlpacaServiceInterface {
  headers: AlpacaServiceHeader;
  constructor(headers: AlpacaServiceHeader) {
    this.headers = headers;
  }

  async requestMarketOrder(symbol: string, params: any) {
    let res = await axios.post(`/orders`, params, {
      headers: this.headers
    });
    return res.data;
  }

  async getPosition(symbol: string) {
    try {
      let res = await axios.get(`/positions/${symbol.toUpperCase()}`, {
        headers: this.headers
      });
      return res.data;
    } catch {
      return null;
    }
  }

  async getPositions() {
    let res = await axios.get("/positions", { headers: this.headers });
    return res.data;
  }

  async getOrder(_id: string) {
    let res = await axios.get(`/orders/${_id}`, {
      headers: this.headers
    });
    return res.data;
  }

  async getOrders() {
    let res = await axios.get("/orders", { headers: this.headers });
    return res.data;
  }
}
