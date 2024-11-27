 class link {
    name: string;
    hp: number;
    str: number;
    rarity: number;
    hpMax: number;
    level: number;
    experience: number;
    experienceLevelUp: number;

    constructor(data: any) {
        this.name = data.name;
        this.hp = data.hp;
        this.str = data.str;
        this.rarity = data.rarity;
        this.hpMax = data.hp;
        this.level = 1;
        this.experience = 0;
        this.experienceLevelUp = 60;
    }


gainExperience(points: number) {
    this.experience += points;
    console.log(`${this.name} won ${points} EXP !`);
    this.levelUp();
}


levelUp() {
    while (this.experience >= this.experienceLevelUp) {
        this.experience -= this.experienceLevelUp;
        this.level++;
        this.str += Math.floor(Math.random() * 5) + 1;
        this.hpMax += Math.floor(Math.random() * 10) + 5;
        this.hp = this.hpMax;
        this.experienceLevelUp += 50;
        console.log(`${this.name} - level up ${this.level} !`);
    }
}
}

export default link;