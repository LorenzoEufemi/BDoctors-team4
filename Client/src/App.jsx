import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AdvancedSearch from "../pages/AdvancedSearch/AdvancedSearch";
import HomePage from "../pages/HomePage/HomePage";
import SingleDoctor from "../pages/SingleDoctor/SingleDoctor";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import GlobalContext from "../context/GlobalContext";
import { useState, useContext } from "react";

function App() {

  const [ricerca, setRicerca] = useState(null)
  const [specializzazioneNome, setSpecializzazioneNome] = useState("")

  const GlobalProviderValue = {
    setRicerca,
    ricerca,
    specializzazioneNome,
    setSpecializzazioneNome
  }

  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dottori" element={<AdvancedSearch />} >
            <Route path=":slug" element={<SingleDoctor />} />
          </Route>
          <Route path="/accedi" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </GlobalContext.Provider>
  )
};

export default App;