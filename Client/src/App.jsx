import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import AdvancedSearch from "./pages/AdvancedSearch/AdvancedSearch";
import HomePage from "./pages/HomePage/HomePage";
import SingleDoctor from "./pages/SingleDoctor/SingleDoctor";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import GlobalContext from "./context/GlobalContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Contattaci from "./components/Contattaci/Contattaci";

function App() {
  const backUrl = import.meta.env.VITE_BACKEND_URL;

  // recupera i dati dal localStorage, se presenti
  const savedSpec = localStorage.getItem('selectedSpec');
  const savedAllSpec = localStorage.getItem('allSpec');
  const saveNameSpecSelected = localStorage.getItem('nameSpecSelected')
  const saveSlugDoctor = localStorage.getItem('slugDoctor')
  const saveIdDoctor = localStorage.getItem('idDoctor')
  const saveNameSpec = localStorage.getItem('nameSpecSelected')

  // stati che si usano in più pagine/componenti
  const [allSpec, setAllSpec] = useState(savedAllSpec ? JSON.parse(savedAllSpec) : null);
  const [selectedSpec, setSelectedSpec] = useState(savedSpec ? Number(savedSpec) : null);
  const [nameSpecSelected, setNameSpecSelected] = useState(saveNameSpecSelected ? String(saveNameSpecSelected) : null); // Mantieni stringa
  const [slugDoctor, setSlugDoctor] = useState(saveSlugDoctor ? String(saveSlugDoctor) : null)
  const [idDoctor, setIdDoctor] = useState(saveIdDoctor ? String(saveIdDoctor) : null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [nameSpec, setNameSpec] = useState(saveNameSpec ? String(saveNameSpec) : null)



  useEffect(() => {
    axios.get(`${backUrl}specializations`)
      .then(result => {
        setAllSpec(result.data.data);
        localStorage.setItem('allSpec', JSON.stringify(result.data.data));
      })
      .catch(error => console.error("Errore nel recupero delle specializzazioni:", error));
  }, []); // Il useEffect viene eseguito solo al primo render

  useEffect(() => {
    if (!savedAllSpec) {
      axios.get(`${backUrl}specializations`).then(result => {
        setAllSpec(result.data.data);
        localStorage.setItem('allSpec', JSON.stringify(result.data.data));
      });
    }
  }, [savedAllSpec]);

  useEffect(() => {
    if (nameSpecSelected !== null) {
      localStorage.setItem('nameSpecSelected', nameSpecSelected)
    }
  }, [nameSpecSelected]);

  useEffect(() => {
    if (idDoctor !== null) {
      localStorage.setItem('idDoctor', idDoctor)
    }
  }, [idDoctor]);

  useEffect(() => {
    if (slugDoctor !== null) {
      localStorage.setItem('slugDoctor', slugDoctor)
    }
  }, [slugDoctor]);

  /////////////////////////
  /////// HOMEPAGE ////////
  /////////////////////////
  const handleSelect = (event) => {
    setSelectedSpec(event.target.value !== "null" ? Number(event.target.value) : null)
    setNameSpecSelected(event.target.options[event.target.selectedIndex].text);
    setFilters((prevFilters) => ({
      ...prevFilters,
      specialization: event.target.value,
    }));
  };

  //////////////////////////
  /// ADVANCED SEARCHBAR ///
  //////////////////////////

  const [filters, setFilters] = useState({
    firstname: "",
    lastname: "",
    specialization: "",
  });
  

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searching, setSearching] = useState(false);

  // aggiorna input utente
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // // gestione submit del form - AdvancedSearch
  const handleSubmit = (event) => {
    event.preventDefault();
    // reset lista medici
    setDoctors([]);
    // reset della pagina a 1
    setPage(1);
    setNameSpecSelected(nameSpec);
    // abilita la ricerca
    setSearching(true); 
    searchDoctors();    
  };

  // ricerca dottori 
  const searchDoctors = async () => {
    // caricamento connesione lenta
    setLoading(true);
    // se c'è un errore, lo salva
    setError("");
    // gestisce il codice che potrebbe generare errori
    try {
      // fa sì che il codice si "fermi" fino a quando la risposta dalla richiesta non arriva, senza bloccare il thread principale
      const response = await axios.get(`${backUrl}doctors`, {
        params: {...filters, page, limit },
      });
      setDoctors(response.data.data);
      // cattura errori
    } catch (error) {
      setError("Errore nella ricerca dei dottori.");
      // disattiva loading
    } finally {
      setLoading(false);
    }
  };

  // impedisce di andare su una pagina inferiore a 1
  const handlePageChange = (newPage) => {
  
    if (newPage >= 1) {
      setPage(newPage);
    }
  };

  // disabilitare il pulsante "Successivo" se non ci sono più medici
  const disableNextButton = doctors.length < limit;

  // gestione selezione spec
  const handleSelectSpecialization = (event) => {
    // aggiorna filtro specilizzazione quando l'utente selezione una specializzazione
    setFilters((prevFilters) => ({
      ...prevFilters,
      specialization: event.target.value,
    }));
  };

  /////////////////////////
  ///// SINGLE DOCTOR /////
  /////////////////////////
  const [refresh, setRefresh] = useState(true);
  const [errorReview, setErrorReview] = useState([]);

  /////////////////////////
  ////// FORM REVIEW //////
  /////////////////////////
  const defaultReview = {
    email: "",
    review: "",
    vote: null,
    patient: ""
  };

  const [formReview, setFormReview] = useState(defaultReview);

  const hendelChangeReview = (e) => {
    const { name, value } = e.target
    const newObject = {
      ...formReview,
      [name]: value
    };
    setFormReview(newObject);
  };

  const submitForm = (e) => {
    e.preventDefault();
    let validation = 0;
    let error = [];
    setErrorReview(error);

    for (let key in formReview) {

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
              error.push(`La email contiene il numero sbagliato di @* `)
            }
          } else {
            error.push("La email è troppo corta* ")
            validation = false
          }
        }
        if (key === "patient") {
          if (spaceless.length >= 3) {
            validation = validation + 1
          } else {
            error.push(`Il nome sulla recensione dev'essere di almeno 3 caratteri* `)
            validation = false
          }
        }
        if (key === "review") {
          if (spaceless.length >= 10) {
            validation = validation + 1
          } else {
            validation = false
            error.push("La recensione dev'essere di almeno 10 caratteri* ")
          }
        }
      } else {
        console.log("sono qui");
        
        if (formReview[key] === null) {
          error.push("Devi lasciare un voto ")
        } else {
          validation++
        }
      }
    };

    setErrorReview(error)
    if (validation === 4) {
      axios.post(`${backUrl}doctors/${idDoctor}/reviews`, formReview).then(resp => {
        setFormReview(defaultReview);
        setRefresh(!refresh);
      });
    };
  };

  const resetFormReview = () => {
    setFormReview(defaultReview)
  };

  /////////////////////////
  ///// GLOBAL CONTEXT ////
  /////////////////////////
  const GlobalProviderValue = {
    isSuccess,
    setIsSuccess,
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
    setErrorReview,
    filters,
    setFilters,
    doctors,
    setDoctors,
    loading,
    setLoading,
    error,
    setError,
    page,
    setPage,
    limit,
    searching,
    setSearching,
    handleInputChange,
    handleSubmit,
    searchDoctors,
    handlePageChange,
    handleSelectSpecialization,
    disableNextButton,
    handleSelect,
    setNameSpec
  };

  return (
    <GlobalContext.Provider value={GlobalProviderValue}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<Contattaci />} />
            <Route path="/doctors">
              <Route index element={<AdvancedSearch />} />
              <Route path=":slug" element={<SingleDoctor />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default App;