import { CardData, ScryfallCard } from "../../shared/interfaces";

export const homePageLoader = async () => {
  const data = await fetch('https://api.scryfall.com/cards/random');
  const dataJson = await data.json() as ScryfallCard;
  const cardData = 
    !dataJson.image_uris && dataJson.card_faces ?
      {
        id: dataJson.id,
        name: dataJson.card_faces[0].name,
        type_line: dataJson.card_faces[0].type_line,
        color_identity: dataJson.color_identity,
        mana_cost: dataJson.card_faces[0].mana_cost,
        img_url: dataJson.card_faces[0].image_uris?.normal,
        keywords: dataJson.keywords
        }
      :
      {
        id: dataJson.id,
        name: dataJson.name,
        type_line: dataJson.type_line,
        color_identity: dataJson.color_identity,
        mana_cost: dataJson.mana_cost,
        img_url: dataJson.image_uris.normal,
        keywords: dataJson.keywords
      } 
  return cardData as CardData;
}