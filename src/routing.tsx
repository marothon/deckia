import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import { App } from "./components/ui";
import { CardDetailPage, CardSearchPage, DeckDetailPage, DeckListPage, HomePage, PageNotFoundPage } from "./pages";
import { homePageLoader, deckDetailPageLoader, deckListPageLoader } from "./pages/loaders";

export const routes = createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index element={<HomePage />} loader={homePageLoader}/>
    <Route path='card/:id' element={<CardDetailPage/>}/>
    <Route path='card/search' element={<CardSearchPage/>}/>
    <Route path='deck/:id' element={<DeckDetailPage/>} loader={deckDetailPageLoader}/>
    <Route path='decks' element={<DeckListPage/>} loader={deckListPageLoader}/>
    <Route path='404' element={<PageNotFoundPage />} />
    <Route path="*" element={<Navigate to='404' />} />
  </Route>
)

export const routing = createBrowserRouter(routes, import.meta.env.BASE_URL ? {basename: import.meta.env.BASE_URL} : undefined);