import { translateSymbols } from "../../shared/data";
import { CardData } from "../../shared/interfaces";
import { CardActionList } from "../card/CardActionList";
import './css/CardListRow.css';

export function CardListRow({card}: {card: CardData}) {
  return (
    <div className='card-list-row'>
      <p className='card-name'>{card.name}</p>
      <div className='mana-cost'>{card.mana_cost ? translateSymbols(card.mana_cost): ''}</div>
      <p className='card-type'>{card.type_line}</p>
      <CardActionList className='card-list-row-actions' card={card}/>
    </div>
  )
}