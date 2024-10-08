import backSideImg from '../../assets/img/mtg_backside.jpg';
import './Card.css';

export function Card({cardImgURL, className} : {cardImgURL: string, className: string}) {
  return (
    <div className={`${className} mtg-card`}>
      <div className='mtg-card-inner'>
        <img src={cardImgURL} className='front' />
        <img src={backSideImg} className='back' />
      </div>
    </div>
  )
}