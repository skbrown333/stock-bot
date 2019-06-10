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
const modules_1 = require("@stock-bot/modules");
console.log("IEXService: ", modules_1.default);
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        let s = yield modules_1.default.getSymbolQuote("aapl");
        console.log(s);
    });
}
console.log("Hello World");
test();
//# sourceMappingURL=bot.js.map