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

  const [allSpec, setAllSpec] = useState(null)
  const [selectedSpec, setSelectedSpec] = useState(null)

  useEffect(() => {
    axios.get(`${backUrl}specializations`).then( result =>{
      setAllSpec(result.data.data)
    })
  }, [])


  const GlobalProviderValue = {
    allSpec,
    selectedSpec,
    setSelectedSpec
  }

  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctors" element={<AdvancedSearch />} >
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