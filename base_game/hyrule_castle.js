"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var players = require("../ressources/players.json");
var enemies = require("../ressources/enemies.json");
var bosses = require("../ressources/bosses.json");
var readline = require("readline");
var link = /** @class */ (function () {
    function link(data) {
        this.name = data.name;
        this.hp = data.hp;
        this.str = data.str;
        this.rarity = data.rarity;
        this.hpMax = data.hp;
        this.level = 1;
        this.experience = 0;
        this.experienceToLevelUp = 60;
    }
    return link;
}());
function getrandomcharacter(data) {
    var rarityRoll = Math.random() * 100;
    var rarityFilter = data.filter(function (personnage) {
        if (rarityRoll <= 50)
            return personnage.rarity === 1;
        if (rarityRoll <= 80)
            return personnage.rarity === 2;
        if (rarityRoll <= 95)
            return personnage.rarity === 3;
        if (rarityRoll <= 99)
            return personnage.rarity === 4;
        return personnage.rarity === 5;
    });
    var randomLink = Math.floor(Math.random() * rarityFilter.length);
    return new link(rarityFilter[randomLink]);
}
var joueur = getrandomcharacter(players);
console.log(joueur);
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function floorLevel(joueur) {
    return __awaiter(this, void 0, void 0, function () {
        var floor, mobs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    floor = 1;
                    _a.label = 1;
                case 1:
                    if (!(floor <= 10)) return [3 /*break*/, 4];
                    console.log("\u001B[33m \n======== FIGHT ".concat(floor, " ========\u001B[0m"));
                    mobs = floor < 10 ? getrandomcharacter(enemies) : getrandomcharacter(bosses);
                    return [4 /*yield*/, battle(joueur, mobs)];
                case 2:
                    _a.sent();
                    if (joueur.hp <= 0) {
                        console.log("".concat(joueur.name, " has been defeated. Game Over!"));
                        return [3 /*break*/, 4];
                    }
                    if (floor === 10 && mobs.hp <= 0) {
                        console.log("Congratulations! You defeated ".concat(mobs.name, "!"));
                    }
                    _a.label = 3;
                case 3:
                    floor += 1;
                    return [3 /*break*/, 1];
                case 4:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
function battle(joueur, mobs) {
    return __awaiter(this, void 0, void 0, function () {
        var action;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(joueur.hp > 0 && mobs.hp > 0)) return [3 /*break*/, 2];
                    console.log("\u001B[31m".concat(mobs.name, "\u001B[0m"));
                    console.log("HP: ".concat(mobs.hp, " / ").concat(mobs.hpMax));
                    console.log("\u001B[32m\n".concat(joueur.name, "\u001B[0m"));
                    console.log("HP: ".concat(joueur.hp, " / ").concat(joueur.hpMax));
                    return [4 /*yield*/, askAction()];
                case 1:
                    action = _a.sent();
                    if (action === '1') {
                        mobs.hp -= joueur.str;
                        console.log("".concat(joueur.name, " attacks ").concat(mobs.name, " for ").concat(joueur.str, " damage."));
                    }
                    else if (action === '2') {
                        joueur.hp = Math.min(joueur.hp + joueur.hpMax / 2, joueur.hpMax);
                        console.log("".concat(joueur.name, " heals for ").concat(joueur.hpMax / 2, " HP."));
                    }
                    else {
                        console.log('Invalid choice!');
                        return [3 /*break*/, 0];
                    }
                    if (mobs.hp <= 0) {
                        console.log("\u001B[32m".concat(mobs.name, " has been defeated!\u001B[0m"));
                        return [3 /*break*/, 2];
                    }
                    joueur.hp -= mobs.str;
                    console.log("\u001B[31m".concat(mobs.name, " attacks ").concat(joueur.name, " for ").concat(mobs.str, " damage.\u001B[0m"));
                    return [3 /*break*/, 0];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function askAction() {
    return new Promise(function (resolve) {
        console.log("---- Options ----------");
        rl.question('1 - Attack     2 - Heal ', function (answer) {
            resolve(answer);
        });
    });
}
floorLevel(joueur);
