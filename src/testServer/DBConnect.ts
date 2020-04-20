import * as knex from "knex";
import * as bot from "../bot";

export const db = knex(bot.mysql);