import { Link, NavLink } from "react-router-dom";
import './Header.css';

export default function Header() {
  return (
    <header>
      <Link to="/">
        Deckia
      </Link>
      <nav>
        <NavLink to='decks'>Decks</NavLink>
        <NavLink to='card/search'>Search</NavLink>
      </nav>
    </header>
  )
}
