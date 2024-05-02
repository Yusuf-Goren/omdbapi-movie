import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import MoviePage from "./pages/moviePage";

function App() {
  return (
    <div style={{ width: "100%", background: "transparent" }} className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route path="/moviepage/:movieImdbId" element={<MoviePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
