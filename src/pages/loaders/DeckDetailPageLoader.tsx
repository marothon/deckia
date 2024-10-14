import { LoaderFunction } from "react-router-dom";
import { MapSerializerJSON } from "../../shared/util";

export const deckDetailPageLoader: LoaderFunction = ({params}) => {
  let decks = JSON.parse(window.localStorage.getItem('decks') as string, MapSerializerJSON.reviver);
  return decks[parseInt(params.id as string)-1];
}