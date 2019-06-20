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
import { AlpacaServiceInterface } from "../Types/alpaca-service";

class AlpacaService implements AlpacaServiceInterface {
  constructor() {}

  async requestMarketOrder(symbol: string, params: any) {
    const side = params && params.side ? params.side : "buy";
    const body = {
      symbol: symbol.toLocaleUpperCase(),
      qty: params && params.qty ? params.qty : 1,
      side: side,
      type: "market",
      time_in_force: "day",
      limit_price: null,
      stop_price: null
    };

    let res = await axios.post(`/orders`, body, {
      headers: {
        "APCA-API-KEY-ID": "PKMEQY0XYEPNVVRG9KEE",
        "APCA-API-SECRET-KEY": "xFnT9wC0t6skGfxQmric7tKtzYNL2lNIVvuEJsKO"
      }
    });
    return res.data;
  }

  async getPosition(symbol: string) {
    let res = await axios.get(`/positions/${symbol.toUpperCase()}`, {
      headers: {
        "APCA-API-KEY-ID": "PKMEQY0XYEPNVVRG9KEE",
        "APCA-API-SECRET-KEY": "xFnT9wC0t6skGfxQmric7tKtzYNL2lNIVvuEJsKO"
      }
    });
    return res.data;
  }

  async getOrder(_id: string) {
    let res = await axios.get(`/orders/${_id}`, {
      headers: {
        "APCA-API-KEY-ID": "PKMEQY0XYEPNVVRG9KEE",
        "APCA-API-SECRET-KEY": "xFnT9wC0t6skGfxQmric7tKtzYNL2lNIVvuEJsKO"
      }
    });
    return res.data;
  }
}

export default new AlpacaService();
