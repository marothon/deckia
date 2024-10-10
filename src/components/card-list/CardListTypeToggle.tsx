import { useState } from "react";
import './CardListTypeToggle.css';

export function CardListTypeToggle({onToggle}: {onToggle: Function}) {
  const [isImage, setIsImage] = useState<boolean>(true);

  const handleToggle = () => {
    setIsImage(!isImage);
    if(!isImage)
      onToggle('image')
    else
      onToggle('row');
  }

  return (
    <span onClick={handleToggle} className='card-list-toggle'>
      <span className={`image ${isImage ? 'active' : ''}`}>Card</span>
      <span className={`row ${!isImage ? 'active' : ''}`}>List</span>
    </span>
  )
}