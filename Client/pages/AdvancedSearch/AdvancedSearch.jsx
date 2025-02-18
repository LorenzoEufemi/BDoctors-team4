import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/card/DoctorCard";
import { useLocation } from 'react-router-dom';
import SearchBar from "../../components/searchbar/Searchbar";


function AdvancedSearch() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    console.log("Query params inviati:", queryParams);
    const specializationQueryParam = queryParams.get('specialization');

    const backurl = import.meta.env.VITE_BACKEND_URL;
    const { selectedSpec, nameSpecSelected, doctors, setDoctors, setFilters, filters,setIsSuccess } = useContext(GlobalContext);
    const navigate = useNavigate();

    // const [dottori, setDottori] = useState(null);
    // const [filteredDottori, setFilteredDottori] = useState([]);
    // const [filters, setFilters] = useState({
    //     firstname: '',
    //     lastname: '',
    // });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsSuccess(false);
        if (specializationQueryParam) {
            setFilters({
                ...filters,
                firstname: "",
                lastname: "",
                // specialization: "",
            })
            setLoading(true);
            axios
                .get(`${backurl}specializations/${specializationQueryParam}`)
                .then((result) => {
                    console.log(result.data); // Aggiungi questa linea per vedere cosa contiene la risposta
                    setLoading(false);
                    setDoctors(result.data.data);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Errore nella richiesta API:', error)
                });
        }
    }, [specializationQueryParam, backurl]);

    // non utilizzata
    // const handleFilterChange = (e) => {
    //     const { name, value } = e.target;
    //     setFilters((prevFilters) => {
    //         const updatedFilters = { ...prevFilters, [name]: value };
    //         console.log("Filtri aggiornati:", updatedFilters);
    //         return updatedFilters;
    //     });
    // };

    // const filterDoctors = () => {
    //     const { firstname, lastname, specialization } = filters;

    //     if (!firstname && !lastname && !specialization) {
    //         setFilteredDottori(dottori);
    //         return;
    //     }
    //     const filtered = dottori.filter((doctor) => {
    //         const matchesFirstname = firstname ? doctor.firstname?.toLowerCase().includes(firstname.toLowerCase()) : true;
    //         const matchesLastname = lastname ? doctor.lastname?.toLowerCase().includes(lastname.toLowerCase()) : true;
    //         return matchesFirstname && matchesLastname;
    //     });
    //     setDottori(filtered);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     filterDoctors();
    // };

    // useEffect(() => {
    //     filterDoctors();
    // }, [filters, dottori]);

    return (
        <div className="advanced-search-container">
            <h1 className="ads-title">Ricerca {nameSpecSelected === "-- Seleziona una specializzazione --" ? "Tutti i Dottori" : nameSpecSelected}</h1>
            <div className="d-flex justify-content-center">
                {/* <form onSubmit={handleSubmit} className="d-flex gap-3">
                    <div className="">
                        <label htmlFor="firstname">Nome:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={filters.firstname}
                            onChange={handleFilterChange}
                            placeholder="Cerca per nome"
                            className="form-control"
                            required
                        />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>

                    <div className="mr-2">
                        <label htmlFor="lastname">Cognome:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={filters.lastname}
                            onChange={handleFilterChange}
                            placeholder="Cerca per cognome"
                            className="form-control"
                            required
                        />
                        <div className="valid-feedback">
                            Looks good!
                        </div>
                    </div>
                </form> */}
            </div>

            <SearchBar />

            <button className="btn-back z-3 position-fixed rounded-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-caret-left" style={{ color: "#4FBE89" }}></i>
            </button>
            {
                loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }
            <div className="d-flex justify-content-between my-5">
                <div className="my-2 doctor-list">
                    {
                        Array.isArray(doctors) ? (
                            doctors.map((curElem) => (
                                <DoctorCard dottore={curElem} key={curElem.id} />
                            ))
                        ) : (
                            <p>nessun dottore con questa specializzazione</p>
                        )}
                </div>

            </div>
        </div>
    );
}

export default AdvancedSearch;