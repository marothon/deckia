import { translateSymbols } from "../../shared/data";
import { CardData } from "../../shared/interfaces";
import './CardListRow.css';

export function CardListRow({cardData}: {cardData: CardData}) {
  return (
    <div className='card-list-row'>
      <p className='card-name'>{cardData.name}</p>
      <div className='mana-cost'>{cardData.mana_cost ? translateSymbols(cardData.mana_cost): ''}</div>
      <p className='card-type'>{cardData.type_line}</p>
    </div>
  )
}