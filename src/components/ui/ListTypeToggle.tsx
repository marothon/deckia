import { useState } from "react";
import './css/ListTypeToggle.css';

export type ListType = 'card' | 'row';

export function ListTypeToggle({onToggle}: {onToggle: (type: ListType) => void}) {
  const [isCard, setIsCard] = useState<boolean>(true);

  const handleToggle = () => {
    setIsCard(!isCard);
    if(!isCard)
      onToggle('card')
    else
      onToggle('row');
  }

  return (
    <span onClick={handleToggle} className='list-type-toggle'>
      <span className={`card ${isCard ? 'active' : ''}`}>Card</span>
      <span className={`row ${!isCard ? 'active' : ''}`}>List</span>
    </span>
  )
}