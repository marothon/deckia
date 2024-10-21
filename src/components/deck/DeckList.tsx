import { Link } from "react-router-dom";
import { DeckStorage, translateSymbols } from "../../shared/data";
import { DeckData } from "../../shared/interfaces";
import './css/DeckList.css';
import { MouseEventHandler, useContext } from "react";
import { DeckContext } from "./";
import { useMediaQuery } from "usehooks-ts";

export function DeckList({decks, listType, onDeckRemoval}: {decks: DeckData[], listType: 'card' | 'row', onDeckRemoval?: Function}) {
  const {deck, changeDeck} = useContext(DeckContext);
  const isMobileWidth = useMediaQuery('(max-width: 1000px)');
  
  const colorIdentity = (d: DeckData) => {
    return (
      <div className='color-identity'>{
          d.color_identity ? 
            d.color_identity.map(c => translateSymbols(`{${c}}`))
            :
            ''
        }
      </div>
    );
  }

  const removeDeck = (d: DeckData): MouseEventHandler<HTMLSpanElement>  => {
    return () => {
      const confirmed: boolean = confirm("Are you sure? You cannot undo this!");
      if(confirmed){
        DeckStorage.delete(d);
        if(onDeckRemoval){
          onDeckRemoval(d);
        }
        if(deck && deck.id == d.id){
          changeDeck();
        }
      } 
    }
  }

  return (
    <div className={`deck-list ${listType}`}>
      {
        decks.map( d => (
          <article key={d.id} className='deck-list-item'>
            <section className='deck-banner'>
              <h3 className='deck-name'>{d.name}</h3>
              {
                listType == 'card' ? 
                colorIdentity(d) :
                ''
              }
            </section>
            {
              listType == 'row' ?
              colorIdentity(d) :
              ''
            }
            {
              listType == 'row' && !isMobileWidth ?
              (
                <section className='tags'>
                  {
                    d.keywords ? 
                    d.keywords.map( t => <div key={t} className='tag'>{t}</div>) :
                    ''
                  }
                </section>
              )
              :
              ''
            }
            <section className='deck-actions'>
              <Link to={`/deck/${d.id}`}className='material-symbols-outlined'>edit_square</Link>
              <span onClick={removeDeck(d)} className='material-symbols-outlined'>delete</span>
            </section>
          </article>
          )
        )
      }
    </div>
  )

}