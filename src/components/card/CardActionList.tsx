import { MouseEventHandler, useContext } from "react"
import { CardData } from "../../shared/interfaces"
import { DeckContext } from "../deck"
import './css/CardActionList.css';

export function CardActionList({card, className}: {card: CardData, className?: string}) {
  const {deck, addCard, removeCard} = useContext(DeckContext);

  const onAddCard: MouseEventHandler<HTMLSpanElement>  = () => {
    addCard(card);
  }

  const onRemoveCard: MouseEventHandler<HTMLSpanElement>  = () => {
    removeCard(card);
  }

  let cardCount = 0;
  if(deck && deck.cards.has(card.id)){
    cardCount = deck.cards.get(card.id)!.count;
  }

  return (
    <div className={`card-action-list ${className}`}>
      <span className='material-symbols-outlined' onClick={onAddCard}>add_circle</span>
      <span className='card-count'>{cardCount}</span>
      <span className='material-symbols-outlined' onClick={onRemoveCard}>do_not_disturb_on</span>
    </div>
  )
}