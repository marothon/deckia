import { CardData } from "../../shared/interfaces"
import { Card } from "../card/Card";
import { CardListRow } from "./CardListRow";
import "./css/CardList.css";

interface CardListProps{
  cards: CardData[],
  listType: 'card' | 'row'
}

export function CardList({cards, listType}: CardListProps) {
  return (
    <div className={`card-list ${listType}`}>
      {cards.map(cd => 
        (
          <article key={cd.id} className='card-list-item'>
            {
              listType == 'card' ?
              <Card card={cd} enableActions={true}/> :
              <CardListRow card={cd} />
            }
          </article>
        )
      )}
    </div>
  )
}