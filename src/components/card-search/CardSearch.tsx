import { FormEventHandler, forwardRef, Ref, useEffect, useState } from "react"
import { CardData, ScryfallCardSearch } from "../../shared/interfaces";
import { CardList } from "../card-list";
import './CardSearch.css';
import { ListTypeToggle } from "../ui";

export const CardSearch =  forwardRef(function CardSearch({title}: {title?: string}, ref: Ref<HTMLInputElement>){
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<CardData[]>();
  const [listType, setListType] = useState<'card'|'row'>('card');

  useEffect(() => {
    const search = async () => {
      if(searchTerm){
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchTerm}`);
        const responseJson = await response.json() as ScryfallCardSearch;
        setSearchResult(responseJson.data.map(c => {
          if(!c.image_uris && c.card_faces) {
            // TODO: Should check properly if card is Alchemly (thus the A- prefix on the card naame)
            if(c.card_faces[0].name.slice(0, 2) == 'A-'){
              c.card_faces[0].name = c.card_faces[0].name.slice(2);
            }

            return {
              id: c.id,
              name: c.card_faces[0].name,
              type_line: c.card_faces[0].type_line,
              mana_cost: c.card_faces[0].mana_cost,
              cmc: c.cmc,
              color_identity: c.color_identity,
              img_url: c.card_faces[0].image_uris?.normal,
              keywords: c.keywords
              } as CardData;
          } else {
             // TODO: Should check properly if card is Alchemly (thus the A- prefix on the card naame)
             if(c.name.slice(0, 2) == 'A-'){
              c.name = c.name.slice(2);
            }
            return {
              id: c.id,
              name: c.name,
              type_line: c.type_line,
              mana_cost: c.mana_cost,
              cmc: c.cmc,
              color_identity: c.color_identity,
              img_url: c.image_uris.normal,
              keywords: c.keywords
              } as CardData
          }})
        );
      }
    }
    search();
  }, [searchTerm]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setSearchTerm(formData.get('search-term') as string);
  }

  const onToggle = (listType: 'card'|'row') => {
    setListType(listType);
  }

  return (
    <div className='card-search'>
      <form onSubmit={onSubmit}>
        {title ? <h1>{title}</h1> : ''}
        <div className='search-bar'>
          <input ref={ref} name='search-term' type='text' placeholder="Search"/>
          <span className="search-indicator material-symbols-outlined">search</span>
        </div>
        <ListTypeToggle onToggle={onToggle} />
      </form>
      { searchResult ? <CardList cards={searchResult} listType={listType} /> : '' }
    </div>
  )
});