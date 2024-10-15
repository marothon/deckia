import { useState } from "react";
import { CardList } from "../card-list"
import { DeckData } from "../../shared/interfaces";
import './css/DeckCardList.css'
import { ListTypeToggle } from "../ui";

export function DeckCardList({deck}: {deck: DeckData}) {
  const [listType, setListType] = useState<'card'|'row'>('card');
  
  const onToggle = (listType: 'card'|'row') => {
    setListType(listType);
  }

  // Convert the Map of cards to an array of cards
  const cards = [...deck.cards.values()].map(c => c.card)
  
  return (
    <div className='deck-card-list'>
      <div className='filter-container'>
        <div className='filter-bar'>
          <input name='filter-term' type='text' placeholder="Filter"/>
          <span className="search-indicator material-symbols-outlined">search</span>
        </div>
        <ListTypeToggle onToggle={onToggle} />
      </div>
      <CardList cards={cards} listType={listType} />
    </div>
  )
}