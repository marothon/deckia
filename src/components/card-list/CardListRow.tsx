import { useMediaQuery } from "usehooks-ts";
import { translateSymbols } from "../../shared/data";
import { CardData } from "../../shared/interfaces";
import { CardActionList } from "../card/CardActionList";
import './css/CardListRow.css';
import { Link } from "react-router-dom";

export function CardListRow({card}: {card: CardData}) {
  const isMobileWidth = useMediaQuery('(max-width: 1000px)');

  return (
    <div className='card-list-row'>
      <p className='card-name'><Link to={`/card/${card.id}`}>{card.name}</Link></p>
      <div className='mana-cost'>{card.mana_cost ? translateSymbols(card.mana_cost): ''}</div>
      {
        isMobileWidth ?
          ''
        :
          <p className='card-type'>{card.type_line}</p>
      }
      <CardActionList className='card-list-row-actions' card={card}/>
    </div>
  )
}