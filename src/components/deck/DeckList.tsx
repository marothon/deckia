import { Link } from "react-router-dom";
import { translateSymbols } from "../../shared/data";
import { DeckData } from "../../shared/interfaces";
import './css/DeckList.css';

export function DeckList({decks, listType}: {decks: DeckData[], listType: 'card' | 'row'}) {

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
              listType == 'row' ?
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
              <span className='material-symbols-outlined'>delete</span>
            </section>
          </article>
          )
        )
      }
    </div>
  )

}