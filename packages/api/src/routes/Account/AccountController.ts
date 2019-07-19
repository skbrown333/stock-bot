import { AlpacaService } from "@stock-bot/modules";

const alpaca = new AlpacaService({
  "APCA-API-KEY-ID": process.env.ALPACA_ID,
  "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET
});

interface IAccountController {
  getAccount: Function;
}

class AccountController implements IAccountController {
  constructor() {}

  async getAccount(req, res) {
    let account = await alpaca.getAccount();
    res.send(account);
  }
}

export default new AccountController();
