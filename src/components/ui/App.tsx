import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './Header'
import { DeckProvider } from '../deck'

function App() {
  return (
    <DeckProvider>
      <Header />
      <main>
        <Outlet />
      </main>
    </DeckProvider>
  )
}

export default App
