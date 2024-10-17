import { useLoaderData } from "react-router-dom"
import { DeckData } from "../shared/interfaces";
import './css/DeckListPage.css'
import { DeckListWithFilter } from "../components/deck";

export function DeckListPage() {
  const decks = useLoaderData() as DeckData[];

  return (
    <div className='deck-list-page'>
      <DeckListWithFilter label="Decks" decks={decks} />
    </div>
  )
}
