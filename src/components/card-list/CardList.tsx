import { CardData } from "../../shared/interfaces"
import { Card } from "../card/Card";
import { CardListRow } from "./CardListRow";
import "./CardList.css";

interface CardListProps{
  cards: CardData[],
  listType: 'image' | 'row'
}

export function CardList({cards, listType}: CardListProps) {
  return (
    <div className={`card-list ${listType}`}>
      {cards.map(cd => 
        (
          <article key={cd.id} className='card-list-item'>
            {
              listType == 'image' ?
              <Card cardImgURL={cd.img_url} /> :
              <CardListRow cardData={cd} />
            }
          </article>
        )
      )}
    </div>
  )
}