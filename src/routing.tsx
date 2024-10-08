import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router-dom";
import App from "./components/ui/App";
import HomePage from "./pages/HomePage";
import CardDetailPage from "./pages/CardDetailPage";
import DeckListPage from "./pages/DeckListPage";
import DeckDetailPage from "./pages/DeckDetailPage";
import PageNotFoundPage from "./pages/PageNotFoundPage";
import CardSearchPage from "./pages/CardSearchPage";
import { homePageLoader } from "./pages/loaders";

export const routes = createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index element={<HomePage />} loader={homePageLoader}/>
    <Route path='card/:id' element={<CardDetailPage/>}/>
    <Route path='card/search' element={<CardSearchPage/>}/>
    <Route path='deck/:id' element={<DeckDetailPage/>}/>
    <Route path='decks' element={<DeckListPage/>}/>
    <Route path='404' element={<PageNotFoundPage />} />
    <Route path="*" element={<Navigate to='404' />} />
  </Route>
)

export const routing = createBrowserRouter(routes, import.meta.env.BASE_URL ? {basename: import.meta.env.BASE_URL} : undefined);