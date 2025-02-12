import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import AdvancedSearch from "../pages/AdvancedSearch/AdvancedSearch";
import HomePage from "../pages/HomePage/HomePage";
import SingleDoctor from "../pages/SingleDoctor/SingleDoctor";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import GlobalContext from "../context/GlobalContext";
import { useState, useContext, useEffect } from "react";
import axios from "axios";

function App() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  // Recupera i dati dal localStorage, se presenti
  const savedSpec = localStorage.getItem('selectedSpec');
  const savedAllSpec = localStorage.getItem('allSpec');
  const saveNameSpecSelected = localStorage.getItem('nameSpecSelected')

  const [allSpec, setAllSpec] = useState(savedAllSpec ? JSON.parse(savedAllSpec) : null);
  const [selectedSpec, setSelectedSpec] = useState(savedSpec ? Number(savedSpec) : null);
  const [nameSpecSelected, setNameSpecSelected] = useState(saveNameSpecSelected ? String(saveNameSpecSelected) : null); // Mantieni stringa

  useEffect(() => {
    if (!savedAllSpec) {
      axios.get(`${backUrl}specializations`).then(result => {
        setAllSpec(result.data.data);
        localStorage.setItem('allSpec', JSON.stringify(result.data.data));  // Salva allSpec nel localStorage
      });
    }
  }, [savedAllSpec]);

  useEffect(() => {
    if (selectedSpec !== null) {
      localStorage.setItem('selectedSpec', selectedSpec);  // Salva selectedSpec nel localStorage
    }
  }, [selectedSpec]);

  useEffect(() => {
    if (nameSpecSelected !== null) {
      localStorage.setItem('nameSpecSelected', nameSpecSelected)
    }
  }, [nameSpecSelected])

  const GlobalProviderValue = {
    allSpec,
    selectedSpec,
    setSelectedSpec,
    nameSpecSelected,
    setNameSpecSelected
  };


  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/doctors">
              <Route index element={<AdvancedSearch />} />
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