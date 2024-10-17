import { LoaderFunction } from "react-router-dom";
import { ScryfallCard } from "../../shared/interfaces";

export const cardDetailPageLoader: LoaderFunction = async ({params}) => {
  try {
    const data = await fetch(`https://api.scryfall.com/cards/${params.id}`);
    const card = await data.json() as ScryfallCard;
    return card;
  } catch {
    //No such card found
    return null;
  }
}