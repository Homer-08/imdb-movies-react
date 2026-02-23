import { BrowserRouter, Route, Routes } from "react-router-dom"
import Movies from "./pages/Movies/Movies"
import Actors from "./pages/Actors"
import Header from "./components/Header/Header"
import MoviePage from "./pages/MoviePage/MoviePage"

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movie/:id" element={<MoviePage />} />
                <Route path="/actors" element={<Actors />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
