import { useLoaderData } from "react-router-dom"
import { DeckData } from "../shared/interfaces";
import './css/DeckListPage.css'
import { DeckList } from "../components/deck";
import { ListType, ListTypeToggle } from "../components/ui";
import { KeyboardEventHandler, useState } from "react";
import { DeckStorage } from "../shared/data";

export function DeckListPage() {
  const decks = useLoaderData() as DeckData[];
  const [listType, setListType] =  useState<ListType>('card');
  const [displayedDecks, setDisplayedDecks] = useState<DeckData[]>(decks);

  const onToggle = (listType: ListType) => {
    setListType(listType);
  }

  const onFilter: KeyboardEventHandler<HTMLInputElement> = (e) => {
    const filter = (e.target as HTMLInputElement).value;
    setDisplayedDecks(decks.filter(deck => deck.name.search(filter) !== -1));
  }

  const onDeckRemoval = () => {
    setDisplayedDecks(DeckStorage.all());
  }

  return (
    <div className='deck-list-page'>
      <div className='deck-list-filter'>
        <h1>Decks</h1>
        <div className='filter-bar'>
          <input type='text' placeholder='Filter' onInput={onFilter}/>
          <span className='filter-indicator material-symbols-outlined'>filter_alt</span>
        </div>
        <ListTypeToggle onToggle={onToggle} />
      </div>
      {
        decks ? 
          <DeckList decks={displayedDecks} onDeckRemoval={onDeckRemoval} listType={listType}/>
          :
          ''
      }
    </div>
  )
}
