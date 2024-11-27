 import * as players from '../ressources/players.json'
 import * as enemies from'../ressources/enemies.json'
 import * as bosses from '../ressources/bosses.json';
 import * as classes from '../ressources/classes.json';
 import * as races from '../ressources/races.json';
 import * as readline from 'readline';


 class link {
    name: string;
    hp: number;
    str: number
    rarity: number;
    hpMax: number;
    level: number;
    experience: number;
    experienceToLevelUp: number;
    
    constructor(data:any) {
        this.name = data.name;
        this.hp = data.hp;
        this.str = data.str;
        this.rarity = data.rarity;
        this.hpMax = data.hp;
        this.level = 1; // commence lvl1
        this.experience = 0; 
        this.experienceToLevelUp = 60; 
    }
}
function getrandomcharacter(data: any[]): link {
    const rarityRoll = Math.random() * 100;
    const filtered = data.filter(personnage => {
        if (rarityRoll <= 50) return personnage.rarity === 1;
        if (rarityRoll <= 80) return personnage.rarity === 2;
        if (rarityRoll <= 95) return personnage.rarity === 3;
        if (rarityRoll <= 99) return personnage.rarity === 4;
        return personnage.rarity === 5;
    });

    const randomLink = Math.floor(Math.random() * filtered.length);
    return new link(filtered[randomLink]);
}

const joueur = getrandomcharacter(players);
console.log(joueur)





// const max = 0
// const min = 100
// function randomNumber(min: number, max: number) {
//     return Math.ceil(Math.random() * (max - min) + min);
    
// }
// const randomN = randomNumber(min, max)
// console.log(randomN);

// function rarityNumber(randomN: number){
//         if( randomN >= 1 && randomN <= 50 ) {
//         return 1;
//     } else if(randomN >= 51 && randomN <= 80) {
//         return 2;
//     }else if(randomN >= 81 && randomN <= 95) {
//         return 3;
//     } else if(randomN >= 96 && randomN <= 99) {
//         return 4;
//     } else {
//         return 5;
//     }
// }
// rarityNumber(randomN);
// const rarityN = rarityNumber(randomN)
// console.log(rarityNumber(randomN))



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function floorLevel(joueur: link) {
    for (let floor = 1; floor <= 10; floor += 1) {
        console.log(`\x1b[33m \n======== FIGHT ${floor} ========\x1b[0m`);
        const mobs = floor < 10 ? getrandomcharacter(enemies) : getrandomcharacter(bosses);

        await battle(joueur, mobs);

        if (joueur.hp <= 0) {
            console.log(`${joueur.name} has been defeated. Game Over!`);
            break;
        }

        if( floor === 10 && mobs.hp <= 0) {
            console.log(`Congratulations! You defeated ${mobs.name}!`);
        }
    }

    rl.close();
}


async function battle(joueur: link, mobs: any) {
    while (joueur.hp > 0 && mobs.hp > 0) {
        // selection aléatoire
            console.log(`\x1b[31m${mobs.name}\x1b[0m`);
            console.log(`HP: ${mobs.hp} / ${mobs.hpMax}`);
            console.log(`\x1b[32m\n${joueur.name}\x1b[0m`);
            console.log(`HP: ${joueur.hp} / ${joueur.hpMax}`);
        
        // Attaque ou Heal
        const action = await askAction();
        
        if (action === '1') { 
            mobs.hp -= joueur.str;
            console.log(`${joueur.name} attacks ${mobs.name} for ${joueur.str} damage.`);
        } else if (action === '2') { 
            joueur.hp = Math.min(joueur.hp + joueur.hpMax / 2, joueur.hpMax);
            console.log(`${joueur.name} heals for ${joueur.hpMax / 2} HP.`);
        } else {
            console.log('Invalid choice!');
            continue; 
        }        

        if (mobs.hp <= 0) {
            console.log(`${mobs.name} has been defeated!`);
            break;
        }

        // Tour de l'ennemi
        joueur.hp -= mobs.str;
        console.log(`${mobs.name} attacks ${joueur.name} for ${mobs.str} damage.`);
    }
}

function askAction(): Promise<string> {
    return new Promise((resolve) => {
        console.log(`---- Options ----------`)
        rl.question('1 - Attack     2 - Heal ', (answer) => {
            resolve(answer);
        });
    });
}
floorLevel(joueur);

