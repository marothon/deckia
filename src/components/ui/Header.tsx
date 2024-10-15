import { Link, NavLink } from "react-router-dom";
import './css/Header.css';
import { useContext } from "react";
import { DeckContext } from "../deck";

export function Header() {
  const {deck} = useContext(DeckContext);

  return (
    <header>
      <Link to="/">
        Deckia
      </Link>
      <nav>
        {
          deck ? <NavLink to={`deck/${deck.id}`}>{deck.name}</NavLink> : ''
        }
        <NavLink to='decks'>Decks</NavLink>
        <NavLink to='card/search'>Search</NavLink>
      </nav>
    </header>
  )
}
