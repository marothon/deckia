import { useLoaderData, useNavigate } from "react-router-dom"
import { CardData, DeckData } from "../shared/interfaces";
import { DeckCardList, DeckContext } from "../components/deck";
import './css/DeckDetailPage.css';
import { useContext, useEffect, useState } from "react";
import { translateSymbols } from "../shared/data";
import { BarChart, Bar, XAxis, Legend, ResponsiveContainer } from 'recharts';

interface ManaCostBarData {
  cmcLabel: string,
  creature: number,
  instant: number,
  sorcery: number,
  artifact: number,
  enchantment: number
}

export function DeckDetailPage() {
  const pagedDeck: DeckData = useLoaderData() as DeckData;
  const {deck, changeDeck} = useContext(DeckContext);
  const [barData, setBarData] = useState<ManaCostBarData[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if(!pagedDeck){
      navigate('/404');
    }
    changeDeck(pagedDeck);

    
  }, []);

  useEffect(() => {
    if(deck){
      let groupedByCMC: ManaCostBarData[] = [];
      for(let i=0; i<9; i++){
        groupedByCMC[i] = {
          cmcLabel: i.toString(),
          creature: 0,
          instant: 0,
          sorcery: 0, 
          artifact: 0,
          enchantment: 0
        }
      }
      groupedByCMC[8].cmcLabel = '8+';

      for(let [_, deckCard] of deck.cards){
        let card: CardData = deckCard.card;
        let cmc = card.cmc;
        let count = deckCard.count;
        
        if(typeof cmc !== 'undefined'){
          let idx = cmc < 8 ? cmc : 8;
          if(card.type_line.toLowerCase().includes('creature')) groupedByCMC[idx].creature += count;
          if(card.type_line.toLowerCase().includes('sorcery')) groupedByCMC[idx].sorcery += count;
          if(card.type_line.toLowerCase().includes('instant')) groupedByCMC[idx].instant += count;
          if(card.type_line.toLowerCase().includes('artifact')) groupedByCMC[idx].artifact += count;
          if(card.type_line.toLowerCase().includes('enchantment')) groupedByCMC[idx].enchantment += count;
        }
      }
      setBarData(groupedByCMC);
    }
  }, [deck]);

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
          <section className='cmc-chart'>
            {
              barData ? 
                <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={800}
                  data={barData}
                  margin={{
                    top: 25,
                    right: 0,
                    left: 0,
                    bottom: 25,
                  }}
                >
                  <XAxis label={{ value: "CMC (Converted Mana Cost)", position: "bottom", offset: 10 }}  tickLine={false} axisLine={false} dataKey="cmcLabel"/>
                  <Legend layout="vertical" align="right" verticalAlign="middle"/>
                  <Bar dataKey="creature" stackId="a" fill="#9DFF9B" />
                  <Bar dataKey="sorcery" stackId="a" fill="#4125ce" />
                  <Bar dataKey="instant" stackId="a" fill="#FF7878" />
                  <Bar dataKey="artifact" stackId="a" fill="#b7b7b7" />
                  <Bar dataKey="enchantment" stackId="a" fill="#2f891f" />
                </BarChart>
                </ResponsiveContainer>
                :
                <span className="loading-icon material-symbols-outlined">sync</span>
            }
          </section>
          <DeckCardList deck={deck} />
        </> :
        'Loading'
      }
     
    </div>
  )
}