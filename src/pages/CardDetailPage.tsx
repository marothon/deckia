import { useLoaderData } from "react-router-dom"
import { CardData, DeckData, ImageUris, ScryfallCard } from "../shared/interfaces"
import './css/CardDetailPage.css'
import { DeckStorage, translateSymbols } from "../shared/data";
import { CardActionList } from "../components/card";
import { DeckListWithFilter } from "../components/deck";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export function CardDetailPage() {
  const card: ScryfallCard = useLoaderData() as ScryfallCard;
  const [usedInDecks, setUsedInDecks] = useState<DeckData[]>();
  const isMobileWidth = useMediaQuery('(max-width: 1000px)')
  
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

  // TODO: This should be handled better, i.e. be able to flip the card to see the other face
  let img_uris: ImageUris;
  let name: string;
  let oracle: string | undefined;
  let flavor: string | undefined;
  let mana_cost: string;
  let face: any;
  if(card.card_faces && card.card_faces.length > 1){
    face = card.card_faces[0];
  } else {
    face = card;
  }
  img_uris = face.image_uris!
  name = face.name;
  mana_cost = face.mana_cost;
  oracle = face.oracle_text;
  flavor = face.flavor_text;

  const cardDescription = (
    <>
      <div className='mana-cost'>
        {card.mana_cost ? translateSymbols(mana_cost) : ''}
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
        {oracle  ? translateSymbols(addAdditionalLineBreaks(oracle ?? '')) :''}
      </p>
      <p className="card-flavor">
        {flavor}
      </p>
      <CardActionList className="card-detail-page-actions" card={{...card, img_url: img_uris.normal} as CardData}/>
    </>
  );

  return (
    <div className='card-detail-page'>
      <section className="card-details">
        {
          isMobileWidth ?
            <section className="card-details-content">
              <img className="card-image" src={img_uris.large} />
              <section className="card-description">
                <h1 className="card-name">{name}</h1>
                {
                  cardDescription
                }
              </section>
            </section>
          :
          <>
            <h1 className="card-name">{name}</h1>
            <section className="card-details-content">
              <img className="card-image" src={img_uris.large} />
              <section className="card-description">
                {
                  cardDescription
                }
              </section>

            </section>
          </>
        }
        
        <section className="used-in-decks">
            {
              usedInDecks && usedInDecks.length > 0 ?
                (
                  <>
                    {isMobileWidth ? <h1>Used In</h1> : ''}
                    <DeckListWithFilter label={ isMobileWidth ? '' : 'Used In'} decks={usedInDecks} />
                  </>
                )
              :
                ''
            }
          </section>
      </section>
    </div>
  )
}