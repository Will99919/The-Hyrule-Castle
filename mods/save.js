"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hyrule_castle = require("../base_game/hyrule_castle");
console.log(hyrule_castle.default);
var storage = localStorage.setItem("hyrule_castle");
var SAVE_KEY = 'save';
function save() {
    localStorage.setItem(SAVE_KEY, JSON.stringify(storage));
}
function load() {
    return JSON.parse(localStorage.getItem(SAVE_KEY));
}
var storage = load();
storage.score += 10;
save(storage);
