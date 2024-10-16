import { useLoaderData, useNavigate } from "react-router-dom"
import { DeckData } from "../shared/interfaces";
import { DeckCardList, DeckContext } from "../components/deck";
import './css/DeckDetailPage.css';
import { useContext, useEffect } from "react";
import { translateSymbols } from "../shared/data";

export function DeckDetailPage() {
  const pagedDeck: DeckData = useLoaderData() as DeckData;
  const {deck, changeDeck} = useContext(DeckContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!pagedDeck){
      navigate('/404');
    }
    changeDeck(pagedDeck);
  }, []);

  return (
    <div className='deck-detail-page'>
      {
        deck ?
        <>
          <div className='deck-banner'>
            <h1>{deck.name}</h1>
            <section className='color-identity'>
              {
                deck.color_identity.map(c => translateSymbols(`{${c}}`))
              }
            </section>
          </div>
          
          <section className='tags'>
            {
              deck.keywords ? 
              deck.keywords.map( t => <div key={t} className='tag'>{t}</div>) :
              ''
            }
          </section>
          <DeckCardList deck={deck} />
        </> :
        'Loading'
      }
     
    </div>
  )
}