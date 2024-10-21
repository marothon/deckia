import { LoaderFunction } from "react-router-dom";
import { ScryfallCard } from "../../shared/interfaces";

export const cardDetailPageLoader: LoaderFunction = async ({params}) => {
  try {
    const data = await fetch(`https://api.scryfall.com/cards/${params.id}`);
    const card = await data.json() as ScryfallCard;

    // TODO: Should check properly if card is Alchemly (thus the A- prefix on the card naame)
    if(card.name.slice(0, 2) == 'A-'){
      card.name = card.name.slice(2);
      if(card.card_faces){
        card.card_faces[0].name = card.card_faces[0].name.slice(2);
      }
    }
    
    return card;
  } catch {
    //No such card found
    return null;
  }
}