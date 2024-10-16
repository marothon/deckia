import { LoaderFunction } from "react-router-dom";
import { DeckStorage } from "../../shared/data";

export const deckListPageLoader: LoaderFunction = () => {
  return DeckStorage.all();;
}