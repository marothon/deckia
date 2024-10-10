import backSideImg from '../../assets/img/mtg_backside.jpg';
import { CardData } from '../../shared/interfaces';
import './css/Card.css';
import { CardActionList } from './CardActionList';

export function Card({card, className, enableActions} : {card: CardData, className?: string, enableActions?: boolean}) {
  return (
    <div className={`${className ? className+' ' : ''}mtg-card`}>
      <div className='mtg-card-inner'>
        <img src={card.img_url} className='front' />
        { 
          enableActions ? <CardActionList className='mtg-card-actions' card={card}/> : '' 
        }
        <img src={backSideImg} className='back' />
      </div>
    </div>
  )
}