import { LoaderFunction } from "react-router-dom";
import { DeckStorage } from "../../shared/data";

export const deckDetailPageLoader: LoaderFunction = ({params}) => {
  return DeckStorage.get(parseInt(params.id as string));
}