import { useLoaderData, useNavigate } from "react-router-dom"
import { DeckData } from "../shared/interfaces";
import { DeckCardList, DeckContext, ManaCostBarChart } from "../components/deck";
import './css/DeckDetailPage.css';
import { FormEventHandler, useContext, useEffect, useRef, useState } from "react";
import { translateSymbols } from "../shared/data";

export function DeckDetailPage() {
  const pagedDeck: DeckData = useLoaderData() as DeckData;
  const {deck, changeDeck} = useContext(DeckContext);
  const navigate = useNavigate();
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [deckName, setDeckName] = useState<string>(pagedDeck?.name);
  const deckNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(!pagedDeck){
      navigate('/404');
    }
    changeDeck(pagedDeck);
  }, []);

  useEffect(() => {
    const deckWithChangedName = structuredClone(pagedDeck);
    deckWithChangedName!.name = deckName;
    changeDeck(deckWithChangedName);
  }, [deckName]);

  useEffect(() => {
    deckNameRef.current?.focus();
  }, [deckNameRef.current])

  const onNameChange: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData((e.target as HTMLFormElement));
    if(formData.get("deckName")){
      setDeckName(formData.get("deckName") as string);
      setIsEditingName(false);
    }
  }

  if(!pagedDeck) {
    return <></>
  }
  
  return (
    <div className='deck-detail-page'>
      {
        deck ?
        <>
          <div className='deck-banner'>
            <div className="deck-name">
              {
                isEditingName ?
                  <>
                    <form onSubmit={onNameChange}>
                      <input name="deckName" ref={deckNameRef} defaultValue={deck.name}/>
                      <span className='material-symbols-outlined' onClick={()=>{setIsEditingName(false)}}>cancel</span>
                    </form>
                  </>
                :
                  <>
                    <h1>{deck.name}</h1>
                    <span className='material-symbols-outlined' onClick={()=>{setIsEditingName(true)}}>edit_square</span>
                  </>
              }
            </div>
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
          <ManaCostBarChart deck={deck} />
          <DeckCardList deck={deck} />
        </> :
        'Loading'
      }
     
    </div>
  )
}