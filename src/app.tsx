import { Route, Routes, Navigate } from "react-router-dom";

import { Homepage } from "./containers/home-page";
import { PokemonPage } from "./containers/pokemon-page";
import "./global.css";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/pokemon/:id" element={<PokemonPage />} />
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};
