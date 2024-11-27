import * as hyrule_castle from '../base_game/hyrule_castle' ;

console.log(hyrule_castle)

const storage = localStorage.setItem("save" ,"hyrule_castle");
var SAVE_KEY = 'save';

function save() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(hyrule_castle));
}

function load() {
  return JSON.parse(localStorage.getItem(SAVE_KEY));
}

var hyrule_castle = load();
save(hyrule_castle);