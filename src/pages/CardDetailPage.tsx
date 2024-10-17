import { useLoaderData } from "react-router-dom"
import { CardData, DeckData, ScryfallCard } from "../shared/interfaces"
import './css/CardDetailPage.css'
import { DeckStorage, translateSymbols } from "../shared/data";
import { CardActionList } from "../components/card";
import { DeckListWithFilter } from "../components/deck";
import { useEffect, useState } from "react";

export function CardDetailPage() {
  const card: ScryfallCard = useLoaderData() as ScryfallCard;
  const [usedInDecks, setUsedInDecks] = useState<DeckData[]>();
  
  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const addAdditionalLineBreaks = (paragraph: string) => {
    return paragraph.replace(/\n/g, '\n\n');
  }

  useEffect(() => {
    const allDecks = DeckStorage.all();
    setUsedInDecks(allDecks.filter(d => d.cards.has(card.id)));
  }, []);

  return (
    <div className='card-detail-page'>
      <section className="card-details">
        <h1 className="card-name">{card.name}</h1>
        <section className="card-details-content">
          <img className="card-image" src={card.image_uris.large} />
          <section className="card-description">
            <div className='mana-cost'>
              {card.mana_cost ? translateSymbols(card.mana_cost) : ''}
            </div>
            <section className='tags'>
            {
              card.keywords ? 
              card.keywords.map( t => <div key={t} className='tag'>{t}</div>) :
              ''
            }
            </section>
            <section className="set-info">
              <p>{capitalize(card.rarity)} - {card.set_name}</p>
            </section>
            <p className="card-oracle">
              {card.oracle_text  ? translateSymbols(addAdditionalLineBreaks(card.oracle_text)) :''}
            </p>
            <p className="card-flavor">
              {card.flavor_text}
            </p>
            <CardActionList className="card-detail-page-actions" card={{...card, img_url: card.image_uris.normal} as CardData}/>
          </section>
        </section>
        <section className="used-in-decks">
            {
              usedInDecks ?
                <DeckListWithFilter label="Used In" decks={usedInDecks} />
              :
                ''
            }
          </section>
      </section>
    </div>
  )
}