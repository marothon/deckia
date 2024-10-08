import { ScryfallCard } from "../../shared/interfaces";

export const homePageLoader = async () => {
  const data = await fetch('https://api.scryfall.com/cards/random');
  return data.json() as Promise<ScryfallCard>;
}