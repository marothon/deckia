import { createContext, ReactNode, useState } from "react"
import { CardData, DeckData } from "../../shared/interfaces";


interface DeckContextValue {
  deck: DeckData | undefined,
  addCard: (card: CardData) => void,
  removeCard: (card: CardData) => void
}

export const DeckContext = createContext<DeckContextValue>({
  deck: undefined,
  addCard: _ => {},
  removeCard: _ => {}
});


export function DeckProvider({children}: {children: ReactNode}) {
  const [currentDeck, setCurrentDeck] = useState<DeckData>();

  const addCard = (card: CardData) => {
    setCurrentDeck((oldDeck) => {
      if(oldDeck){
        let deck = structuredClone(oldDeck);
        if(deck.cards.has(card.id)){
          deck.cards.get(card.id)!.count += 1;
        } else {
          deck.cards.set(card.id, {count: 1, card: card});
        }
        return deck;
      } else {
        let freshDeckData: DeckData = {
          name: 'Untitled',
          cards: new Map<string, {count: number, card: CardData}>([[card.id, {count: 1, card: card}]])
        }
        return freshDeckData;
      }
    });
  }

  const removeCard = (card: CardData) => {
    setCurrentDeck((oldDeck) => {
      let deck = structuredClone(oldDeck);
      if (deck!.cards.has(card.id)) {
        let count = deck!.cards.get(card.id)!.count--;
        if (count < 1) {
          deck!.cards.delete(card.id);
        }
        return structuredClone(deck);
      }
      return deck;
    });
  }

  const contextValue: DeckContextValue = {
    deck: currentDeck,
    addCard: addCard,
    removeCard: removeCard
  };

  return (
    <DeckContext.Provider value={contextValue}>
      {children}
    </DeckContext.Provider>
  )
}