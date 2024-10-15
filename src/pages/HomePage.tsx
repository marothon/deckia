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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non massa quis erat commodo accumsan.
          Pellentesque finibus mauris eu ligula aliquam laoreet ut eget nisi. Quisque sit amet velit risus.
          Vivamus vulputate, ligula sit amet tristique dapibus, sapien ex scelerisque ex, eu tristique dui arcu feugiat turpis.
          Fusce vel blandit enim. Aliquam dapibus ligula a facilisis aliquam. Proin euismod urna pellentesque massa pulvinar dapibus.
          Donec a justo euismod, maximus purus et, ultricies metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          Vestibulum ut blandit est. Integer nibh velit, congue vitae dui quis, facilisis mollis dolor. Ut nec dictum ipsum. Praesent ac blandit enim, at euismod dolor. Integer sed sagittis libero.
        </p>
      </section>
      <section className="search">
        <CardSearch ref={searchBar} title='Search'/>
      </section>
    </div>
  )
}
