"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_instance_1 = require("./Services/axios.instance");
class IEXService {
    constructor() { }
    getSymbolQuote(symbol, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = filterToQuery(filters);
            let url = `/stock/${symbol}/quote?token=sk_a3bb6a75aa7c43c894e2c7a2e92d5387`;
            let stock = yield axios_instance_1.default.get(url);
            return stock;
        });
    }
}
exports.IEXService = IEXService;
function filterToQuery(filter) { }
class asd {
    constructor(name) {
        this.name = name;
        this.name = "steffan";
    }
}
exports.asd = asd;
//# sourceMappingURL=modules.js.map