export type AlpacaServiceHeader = {
  "APCA-API-KEY-ID": string;
  "APCA-API-SECRET-KEY": string;
};

export interface AlpacaServiceInterface {
  headers: AlpacaServiceHeader;
}
