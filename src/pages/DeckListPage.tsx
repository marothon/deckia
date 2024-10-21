import { useLoaderData } from "react-router-dom"
import { DeckData } from "../shared/interfaces";
import './css/DeckListPage.css'
import { DeckListWithFilter } from "../components/deck";
import { useMediaQuery } from "usehooks-ts";

export function DeckListPage() {
  const decks = useLoaderData() as DeckData[];
  const isMobileWidth = useMediaQuery('(max-width: 1000px)')


  return (
    <div className='deck-list-page'>
      {
        isMobileWidth ?
          <h1>Decks</h1>
        :
          ''
      }
      <DeckListWithFilter label={isMobileWidth ? '' : 'Decks'} decks={decks} />
    </div>
  )
}
