"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colorize = void 0;
exports.Colorize = {
    green: (text) => `\x1b[32m${text}\x1b[0m`,
    yellow: (text) => `\x1b[33m${text}\x1b[0m`,
    red: (text) => `\x1b[31m${text}\x1b[0m`,
    dim: (text) => `\x1b[2m${text}\x1b[0m`,
};
//# sourceMappingURL=constants.js.map