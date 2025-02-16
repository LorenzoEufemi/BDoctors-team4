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
import Contattaci from "../components/Contataci/Contattaci";

function App() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  // Recupera i dati dal localStorage, se presenti
  const savedSpec = localStorage.getItem('selectedSpec');
  const savedAllSpec = localStorage.getItem('allSpec');
  const saveNameSpecSelected = localStorage.getItem('nameSpecSelected')
  const saveSlugDoctor = localStorage.getItem('slugDoctor')
  const saveIdDoctor = localStorage.getItem('idDoctor')


  const defaultReview = {
    email: "",
    review: "",
    vote: 0,
    patient: ""
  }


  const [allSpec, setAllSpec] = useState(savedAllSpec ? JSON.parse(savedAllSpec) : null);
  const [selectedSpec, setSelectedSpec] = useState(savedSpec ? Number(savedSpec) : null);
  const [nameSpecSelected, setNameSpecSelected] = useState(saveNameSpecSelected ? String(saveNameSpecSelected) : null); // Mantieni stringa
  const [slugDoctor, setSlugDoctor] = useState(saveSlugDoctor ? String(saveSlugDoctor) : null)
  const [idDoctor, setIdDoctor] = useState(saveIdDoctor ? String(saveIdDoctor) : null)
  const [formReview, setFormReview] = useState(defaultReview)
  const [refresh, setRefresh] = useState(true)
  const [errorReview, setErrorReview] = useState("")


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

  useEffect(() => {
    if (idDoctor !== null) {
      localStorage.setItem('idDoctor', idDoctor)
    }
  }, [idDoctor])

  useEffect(() => {
    if (slugDoctor !== null) {
      localStorage.setItem('slugDoctor', slugDoctor)
    }
  }, [slugDoctor])

  const hendelChangeReview = (e) => {
    const { name, value } = e.target
    const newObject = {
      ...formReview,
      [name]: value
    }
    setFormReview(newObject)
  }

  const submitForm = (e) => {
    e.preventDefault()
    let validation = 0
    let error = ""
    setErrorReview(error)
    for (let key in formReview) {
      // console.log("sono qui");
      console.log(key);



      if (key !== "vote") {
        const spaceless = formReview[key].replace(/\s+/g, "")
        if (key === "email") {
          if (spaceless.length >= 3) {
            let count = 0
            for (let char in formReview[key]) {
              if (formReview[key][char] === "@") {
                count = count + 1
              }
            }
            if (count === 1) {
              validation = validation + 1
            } else {
              validation = false
              error = error + "la email contiene il numero sbagliato di @ "
            }
          } else {
            error = error + "la email è troppo corta "
            validation = false
          }
        }
        if (key === "patient") {
          if (spaceless.length >= 3) {
            validation = validation + 1
          } else {
            error = error + "il nome sulla recensione dev'essere di almeno 3 caratteri"
            validation = false
          }
        }
        if (key === "review") {
          if (spaceless.length >= 10) {
            validation = validation + 1
          } else {
            validation = false
            error = error + "la recensione dev'essere di almeno 10 caratteri "
          }
        }
      }
    }
    setErrorReview(error)
    if (validation === 3) {      
      axios.post(`${backUrl}doctors/${idDoctor}/reviews`, formReview).then(resp => {
        setFormReview(defaultReview)
        setRefresh(!refresh)
      })
    }
  }

  const resetFormReview = () => {
    setFormReview(defaultReview)
  }

  const GlobalProviderValue = {
    allSpec,
    selectedSpec,
    setSelectedSpec,
    nameSpecSelected,
    setNameSpecSelected,
    slugDoctor,
    setSlugDoctor,
    hendelChangeReview,
    formReview,
    setIdDoctor,
    submitForm,
    refresh,
    resetFormReview,
    errorReview,
    setErrorReview
  };


  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contattaci" element={<Contattaci />} />
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