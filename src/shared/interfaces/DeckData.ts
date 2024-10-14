import { CardData } from "./CardData";

export interface DeckData {
  id: number;
  name: string;
  cards: Map<string, {count: number, card: CardData}>;
  color_identity: string[];
  color_count: Map<string, number>;
  keywords: string[] 
  keyword_count: Map<string, number>;
}