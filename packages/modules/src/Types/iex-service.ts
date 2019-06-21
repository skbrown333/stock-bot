export interface IEXServiceInterface {
  token: string;
  getAllSymbols: Function;
  getSymbolPrice: Function;
}
