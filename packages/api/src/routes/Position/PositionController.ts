import { AlpacaService } from "@stock-bot/modules";

const alpaca = new AlpacaService({
  "APCA-API-KEY-ID": process.env.ALPACA_ID,
  "APCA-API-SECRET-KEY": process.env.ALPACA_SECRET
});

interface IPositionController {
  getPositions: Function;
}

class PositionController implements IPositionController {
  constructor() {}

  async getPositions(req, res) {
    let positions = await alpaca.getPositions();
    res.send(positions);
  }
}

export default new PositionController();
