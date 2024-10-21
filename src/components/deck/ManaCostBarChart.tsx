import { useEffect, useState } from "react";
import { CardData, DeckData } from "../../shared/interfaces";
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis } from "recharts";
import './css/ManaCostBarChart.css';

interface ManaCostBarData {
  cmcLabel: string,
  creature: number,
  instant: number,
  sorcery: number,
  artifact: number,
  enchantment: number,
  other: number
}

export function ManaCostBarChart({deck, className}: {deck: DeckData, className?: string}) {
  const [barData, setBarData] = useState<ManaCostBarData[]>();

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
          enchantment: 0,
          other: 0
        }
      }
      groupedByCMC[8].cmcLabel = '8+';

      for(let [_, deckCard] of deck.cards){
        let card: CardData = deckCard.card;
        let cmc = card.cmc;
        let count = deckCard.count;
        
        if(typeof cmc !== 'undefined'){
          let idx = cmc < 8 ? cmc : 8;
          let categoryCount: number = 0;
          if(card.type_line.toLowerCase().includes('creature') && ++categoryCount) groupedByCMC[idx].creature += count;
          if(card.type_line.toLowerCase().includes('sorcery') && ++categoryCount) groupedByCMC[idx].sorcery += count;
          if(card.type_line.toLowerCase().includes('instant') && ++categoryCount) groupedByCMC[idx].instant += count;
          if(card.type_line.toLowerCase().includes('artifact') && ++categoryCount) groupedByCMC[idx].artifact += count;
          if(card.type_line.toLowerCase().includes('enchantment') && ++categoryCount) groupedByCMC[idx].enchantment += count;

          if(categoryCount == 0 && !card.type_line.toLowerCase().includes('land')) groupedByCMC[idx].other += count;
        }
      }
      setBarData(groupedByCMC);
    }
  }, [deck]);

  return (
    <section className={`mana-cost-chart ${className}`}>
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
            <Bar dataKey="creature" stackId="a" fill="#936422" />
            <Bar dataKey="sorcery" stackId="a" fill="#4125ce" />
            <Bar dataKey="instant" stackId="a" fill="#d3551b" />
            <Bar dataKey="artifact" stackId="a" fill="#4c4c4c" />
            <Bar dataKey="enchantment" stackId="a" fill="#229364" />
            <Bar dataKey="other" stackId="a" fill="#efdf28" />

          </BarChart>
          </ResponsiveContainer>
        :
          <span className="loading-icon material-symbols-outlined">sync</span>
      }
    </section>
  )
}