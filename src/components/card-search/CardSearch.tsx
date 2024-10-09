import { FormEventHandler, useEffect, useState } from "react"
import { CardData, ScryfallCardSearch } from "../../shared/interfaces";
import { CardList, CardListTypeToggle } from "../card-list";
import './CardSearch.css';

export function CardSearch({title}: {title?: string}){
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResult, setSearchResult] = useState<CardData[]>();
  const [listType, setListType] = useState<'image'|'row'>('image');

  useEffect(() => {
    const search = async () => {
      if(searchTerm){
        const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchTerm}`);
        const responseJson = await response.json() as ScryfallCardSearch;
        setSearchResult(responseJson.data.map(c => {
          if(!c.image_uris && c.card_faces) {
            return {
              id: c.id,
              name: c.name,
              type_line: c.type_line,
              mana_cost: c.mana_cost,
              img_url: c.card_faces[0].image_uris?.normal,
              keywords: c.keywords
              } as CardData;
          } else {
            return {
              id: c.id,
              name: c.name,
              type_line: c.type_line,
              mana_cost: c.mana_cost,
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

  const onToggle = (listType: 'image'|'row') => {
    setListType(listType);
  }

  return (
    <div className='card-search'>
      <form onSubmit={onSubmit}>
        {title ? <h1>{title}</h1> : ''}
        <div className='search-bar'>
          <input name='search-term' type='text' placeholder="Search"/>
          <span className="search-indicator material-symbols-outlined">search</span>
        </div>
        <CardListTypeToggle onToggle={onToggle} />
      </form>
      { searchResult ? <CardList cards={searchResult} listType={listType} /> : '' }
    </div>
  )
}