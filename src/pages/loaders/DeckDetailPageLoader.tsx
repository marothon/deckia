import { LoaderFunction } from "react-router-dom";
import { DeckStorage } from "../../shared/data";

export const deckDetailPageLoader: LoaderFunction = ({params}) => {
  let deck = DeckStorage.get(parseInt(params.id as string));
  if(deck)
    return DeckStorage.get(parseInt(params.id as string));
  else
    return null;
}