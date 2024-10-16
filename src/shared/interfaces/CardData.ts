export interface CardData {
  id: string,
  name: string,
  type_line: string,
  mana_cost: string,
  cmc?: number,
  color_identity: string[],
  img_url: string,
  keywords: string[]
}