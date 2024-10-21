import { useContext } from 'react'
import './css/CardSearchPage.css'
import { DeckContext } from '../components/deck'
import { CardSearch } from '../components/card-search';
import { CardList } from '../components/card-list';

export function CardSearchPage() {
  const {deck} = useContext(DeckContext);

  const cards = deck ? [...deck.cards.values()].map(c => c.card) : [];

  return (
    <div className="card-search-page">
      <section className='deck-edit'>
      {
        deck ? 
          <>
            <h2>{deck.name}</h2>
            <CardList listType='row' cards={cards} />
          </>
        :
          <h3>
            Add cards to create a deck!
          </h3>
      }
      </section>

      <section className="search">
        <CardSearch />
      </section>
    </div>
  )
}