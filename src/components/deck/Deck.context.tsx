import { createContext, ReactNode, useEffect, useRef, useState } from "react"
import { CardData, DeckData } from "../../shared/interfaces";
import { MapSerializerJSON } from "../../shared/util";


interface DeckContextValue {
  deck: DeckData | undefined,
  addCard: (card: CardData) => void,
  removeCard: (card: CardData) => void,
  changeDeck: (deck: DeckData) => void
}

export const DeckContext = createContext<DeckContextValue>({
  deck: undefined,
  addCard: _ => {},
  removeCard: _ => {},
  changeDeck: _ => {}
});

export function DeckProvider({children}: {children: ReactNode}) {
  const [currentDeck, setCurrentDeck] = useState<DeckData>();
  const deckIdentity = useRef<number>(1);

  useEffect(() => {
    let decks: DeckData[] = JSON.parse(window.localStorage.getItem('decks') as string, MapSerializerJSON.reviver);
    if(decks){
      deckIdentity.current = decks.length + 1;
      if(currentDeck){
        decks[currentDeck!.id-1] = currentDeck!;
        window.localStorage.setItem('decks', JSON.stringify(decks, MapSerializerJSON.replacer));
      }
    } else {
      if(currentDeck){
        currentDeck!.id = 1;
        window.localStorage.setItem('decks', JSON.stringify([currentDeck], MapSerializerJSON.replacer));
      }
    }
  }, [currentDeck]);

  const addCard = (card: CardData) => {
    setCurrentDeck((oldDeck) => {
      if(oldDeck){
        let deck = structuredClone(oldDeck);
        if(deck.cards.has(card.id)){
          deck.cards.get(card.id)!.count += 1;
        } else {
          deck.cards.set(card.id, {count: 1, card: card});
        }
        for(let color of card.color_identity){
          let c_count = deck.color_count.get(color);
          if( !c_count ){
            deck.color_identity.push(color);
            c_count = 0;
          } 
          deck.color_count.set(color, c_count + 1)
        }
        for(let keyword of card.keywords){
          let k_count = deck.keyword_count.get(keyword);
          if( !k_count ){
            deck.keywords.push(keyword);
            k_count = 0
          }
          deck.keyword_count.set(keyword, k_count + 1);
        }
        return deck;
      } else {
        let freshDeckData: DeckData = {
          id: deckIdentity.current++,
          name: 'Untitled',
          color_identity: structuredClone(card.color_identity),
          color_count: new Map<string, number>(card.color_identity.map(c => [c, 1])),
          cards: new Map<string, {count: number, card: CardData}>([[card.id, {count: 1, card: card}]]),
          keywords: [],
          keyword_count: new Map<string, number>(card.keywords.map(k => [k, 1]))
        }
        return freshDeckData;
      }
    });
  }

  const removeCard = (card: CardData) => {
    setCurrentDeck((oldDeck) => {
      let deck = structuredClone(oldDeck);
      if(deck){
        if (deck.cards.has(card.id)) {
          let count = --deck.cards.get(card.id)!.count;
          if (count < 1) {
            deck!.cards.delete(card.id);
          }
          for(let color of card.color_identity){
            let count = deck.color_count.get(color)! - 1;
            if(count < 1){
              const idx = deck.color_identity.indexOf(color);
              deck.color_identity.splice(idx, 1);
              deck.color_count.delete(color);
            } else {
              deck.color_count.set(color, count);
            }
          }
          for(let keyword of card.keywords){
            let count = deck.keyword_count.get(keyword)! - 1;
            if(count < 1){
              const idx = deck.keywords.indexOf(keyword);
              deck.keywords.splice(idx, 1);
              deck.keyword_count.delete(keyword);
            } else {
              deck.keyword_count.set(keyword, count);
            }
          }
        }
      }
      return deck;
    });
  }

  const changeDeck = (deck: DeckData) => {
    setCurrentDeck(deck);
  }

  const contextValue: DeckContextValue = {
    deck: currentDeck,
    addCard: addCard,
    removeCard: removeCard,
    changeDeck: changeDeck
  };

  return (
    <DeckContext.Provider value={contextValue}>
      {children}
    </DeckContext.Provider>
  )
}