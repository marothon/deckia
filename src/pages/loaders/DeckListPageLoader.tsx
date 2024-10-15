import { LoaderFunction } from "react-router-dom";
import { MapSerializerJSON } from "../../shared/util";

export const deckListPageLoader: LoaderFunction = () => {
  let decks = JSON.parse(window.localStorage.getItem('decks') as string, MapSerializerJSON.reviver);
  return decks;
}