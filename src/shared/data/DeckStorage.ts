import { DeckData } from "../interfaces";
import { MapSerializerJSON } from "../util";

export class DeckStorage {
  static #decks(): DeckData[]{
    return JSON.parse(window.localStorage.getItem('decks') as string, MapSerializerJSON.reviver);
  }

  static all(): DeckData[]{
    return this.#decks() ?? [];
  }

  static get(id: number): DeckData{
    return this.#decks()[id-1];
  }

  static save(deck: DeckData): void{
    let decks = this.#decks();
    decks[deck.id-1] = deck;
    window.localStorage.setItem('decks', JSON.stringify(decks, MapSerializerJSON.replacer));
  }
}