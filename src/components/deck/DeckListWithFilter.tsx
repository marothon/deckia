import { KeyboardEventHandler, useState } from "react";
import { DeckData } from "../../shared/interfaces";
import { ListType, ListTypeToggle } from "../ui"
import { DeckStorage } from "../../shared/data";
import { DeckList } from "./DeckList";
import "./css/DeckListWithFilter.css";

export function DeckListWithFilter({label, decks}: {label?: string, decks: DeckData[]}) {
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
    const remainingDecks = DeckStorage.all();
    const ourDecks = decks.filter(d => remainingDecks.find(rd => rd.id == d.id));
    setDisplayedDecks(ourDecks);
  }

  return (
    <div className="deck-list-with-filter">
      <div className='deck-list-filter'>
        { label ? <h1>{label}</h1> : '' }
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