"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var link = /** @class */ (function () {
    function link(data) {
        this.name = data.name;
        this.hp = data.hp;
        this.str = data.str;
        this.rarity = data.rarity;
        this.hpMax = data.hp;
        this.level = 1;
        this.experience = 0;
        this.experienceLevelUp = 60;
    }
    link.prototype.gainExperience = function (points) {
        this.experience += points;
        console.log("".concat(this.name, " won ").concat(points, " EXP !"));
        this.levelUp();
    };
    link.prototype.levelUp = function () {
        while (this.experience >= this.experienceLevelUp) {
            this.experience -= this.experienceLevelUp;
            this.level++;
            this.str += Math.floor(Math.random() * 5) + 1;
            this.hpMax += Math.floor(Math.random() * 10) + 5;
            this.hp = this.hpMax;
            this.experienceLevelUp += 50;
            console.log("".concat(this.name, " - level up ").concat(this.level, " !"));
        }
    };
    return link;
}());
exports.default = link;
