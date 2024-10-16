import { DeckData } from "../interfaces";
import { MapSerializerJSON } from "../util";

export class DeckStorage {
  static #decks(): DeckData[]{
    return JSON.parse(window.localStorage.getItem('decks') as string, MapSerializerJSON.reviver);
  }

  static all(): DeckData[]{
    return this.#decks();
  }

  static get(id: number): DeckData{
    let decks = this.#decks();
    if(decks){  
      return this.#decks().filter((d) => d.id == id)[0];
    } else {
      throw 'Inconsistent DeckStorage.get() call: No saved decks exist!';
    }
  }

  static save(deck: DeckData): void{
    let decks = this.#decks();
    if(decks){
      let i = decks.findIndex(d => d.id == deck.id);
      if(i !== -1){
        decks[i] = deck;
      } else {
        decks.push(deck);
      }
    } else {
      decks = [deck];
    }
    window.localStorage.setItem('decks', JSON.stringify(decks, MapSerializerJSON.replacer));
  }

  static delete(deck: DeckData): void{
    let decks = this.#decks();
    if(decks){
      let i = decks.findIndex(d => d.id == deck.id)
      decks.splice(i, 1);
      window.localStorage.setItem('decks', JSON.stringify(decks, MapSerializerJSON.replacer));
    }
  }
}