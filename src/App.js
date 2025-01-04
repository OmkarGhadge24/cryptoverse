import "./App.css";
import { Routes, Route } from "react-router-dom";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Exchanges />} />
      <Route exact path="/coins" element={<Coins />} />
      <Route exact path="/coins/:id" element={<CoinDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
