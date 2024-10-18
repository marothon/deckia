import { Outlet, ScrollRestoration } from 'react-router-dom'
import './css/App.css'
import { Header } from './'
import { DeckProvider } from '../deck'

export function App() {
  return (
    <DeckProvider>
      <Header />
      <main>
        <Outlet />
      </main>
      <ScrollRestoration />
    </DeckProvider>
  )
}
