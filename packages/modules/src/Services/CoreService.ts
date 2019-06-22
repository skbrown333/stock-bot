import axiosLib from "axios";
import { CoreServiceInterface } from "../Types/core-service";

const axios = axiosLib.create({
  baseURL: "http://localhost:3000/",
  timeout: 300000
});

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Do something with the response error
    return Promise.reject(error);
  }
);

export default class CoreService implements CoreServiceInterface {
  constructor() {}

  async getOrders() {
    let orders = await axios.get("/orders");
    return orders;
  }

  async getPositions() {
    let positions = await axios.get("/positions");
    return positions;
  }

  async getSymbol(symbol) {
    let quote: any = await axios.get(`/symbol/${symbol}/quote`);
    return quote;
  }

  async getSymbolPrice(symbol) {
    let price: any = await axios.get(`/symbol/${symbol}`);
    return price.value;
  }

  async symbolTransaction(symbol, body) {
    axios.post(`/symbol/${symbol}/transaction`, body);
  }
}
