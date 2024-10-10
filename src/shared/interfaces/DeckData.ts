import { CardData } from "./CardData";

export interface DeckData {
  name: string;
  cards: Map<string, {count: number, card: CardData}>;
  color_identity?: string[];
  tags?: string[];
}