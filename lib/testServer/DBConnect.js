"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const bot = require("../bot");
exports.db = knex(bot.mysql);
//# sourceMappingURL=DBConnect.js.map