import { FormEventHandler, useState } from "react";
import { CardList } from "../card-list"
import { DeckData } from "../../shared/interfaces";
import './css/DeckCardList.css'
import { ListTypeToggle } from "../ui";

export function DeckCardList({deck}: {deck: DeckData}) {
  const [listType, setListType] = useState<'card'|'row'>('card');
  const [filteredTerm, setFilteredTerm] = useState<string>('');
  
  const onToggle = (listType: 'card'|'row') => {
    setListType(listType);
  }


  const onFilter:FormEventHandler<HTMLInputElement> = (e) => {
    setFilteredTerm((e.target as HTMLInputElement).value);
  }

  // Convert the Map of cards to an array of cards and filter based on filteredName
  const cards = [...deck.cards.values()].map(c => c.card).filter(
    (card) => filteredTerm !== '' ? card.name.toLowerCase().includes(filteredTerm.toLocaleLowerCase()) : true
  );

  
  return (
    <div className='deck-card-list'>
      <div className='filter-container'>
        <div className='filter-bar'>
          <input name='filter-term' type='text' placeholder="Filter" onInput={onFilter}/>
          <span className="search-indicator material-symbols-outlined">search</span>
        </div>
        <ListTypeToggle onToggle={onToggle} />
      </div>
      <CardList cards={cards} listType={listType} />
    </div>
  )
}