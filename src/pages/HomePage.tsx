import { CardSearch } from '../components/card-search';
import { Card } from '../components/card';
import { CardData } from '../shared/interfaces';
import './css/HomePage.css';
import { useLoaderData } from 'react-router-dom';
import { useRef } from 'react';

export function HomePage() {
  const card = useLoaderData() as CardData;
  const searchBar = useRef<HTMLInputElement>(null);

  const onSearchActionClick = () => {
    searchBar.current?.focus();
    searchBar.current?.scrollIntoView();
  }

  return (
    <div className="home-page">
      <section className="hero">
        <img className="hero-bg" />
        <section className="call-to-action">
          <section className="description">
            <h1>Explore, choose and build</h1>
            <p>Search among thousands of MTG cards and create your own personal decks!</p>
            <div className='search-action'>
              <button onClick={onSearchActionClick}>Search <span className='material-symbols-outlined'>search</span></button>
            </div>
          </section>
          <Card className='hero-card' card={card} />
        </section>
      </section>
      <section className="about">
        <h1>About</h1>
        <p>
          Deckia is a <a target="_blank" href="https://react.dev/">React</a> application to build <a target="_blank" href="https://magic.wizards.com/en">Magic: The Gathering</a> decks. It was implemented as the final individual project of the <a target="_blank" href="https://github.com/Lexicon-Frontend-2024">Lexicon 2024 Front-End Program.</a> 
        </p>
        <section>
          <p>
            Deckia uses the following libraries in addition to React:
          </p>
          <ul>
            <li><a target="_blank" href="https://reactrouter.com/en/main">React Router</a></li>
            <li><a target="_blank" href="https://recharts.org/en-US/">Recharts</a></li>
            <li><a target="_blank" href="https://www.npmjs.com/package/react-string-replace">React String Replace</a></li>
          </ul> 
        </section>
        <p>
          Card search and imagery is provided by <a target="_blank" href="https://scryfall.com/docs/api">Scryfall's API</a>. This application has no affiliation whatsoever with Scryfall.
        </p>
      </section>
      <section className="search">
        <CardSearch ref={searchBar} title='Search'/>
      </section>
    </div>
  )
}
