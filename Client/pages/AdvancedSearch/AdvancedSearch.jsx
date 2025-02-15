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
    const specializationQueryParam = queryParams.get('specialization');

    const backurl = import.meta.env.VITE_BACKEND_URL;
    const { selectedSpec, nameSpecSelected } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [dottori, setDottori] = useState(null);
    const [filteredDottori, setFilteredDottori] = useState([]);
    const [filters, setFilters] = useState({
        firstname: '',
        lastname: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (specializationQueryParam) {
            setLoading(true);
            axios
                .get(`${backurl}specializations/${specializationQueryParam}`)
                .then((result) => {
                    console.log(result.data); // Aggiungi questa linea per vedere cosa contiene la risposta
                    setLoading(false);
                    setDottori(result.data.data);
                    setFilteredDottori(result.data.data);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error('Errore nella richiesta API:', error)
                });
        }
    }, [specializationQueryParam, backurl]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [name]: value };
            console.log("Filtri aggiornati:", updatedFilters);
            return updatedFilters;
        });
    };

    const filterDoctors = () => {
        const { firstname, lastname, specialization } = filters;

        if (!firstname && !lastname && !specialization) {
            setFilteredDottori(dottori);
            return;
        }

        const filtered = dottori.filter((doctor) => {
            const matchesFirstname = firstname ? doctor.firstname?.toLowerCase().includes(firstname.toLowerCase()) : true;
            const matchesLastname = lastname ? doctor.lastname?.toLowerCase().includes(lastname.toLowerCase()) : true;
            return matchesFirstname && matchesLastname;
        });

        setFilteredDottori(filtered);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        filterDoctors();
    };

    useEffect(() => {
        filterDoctors();
    }, [filters, dottori]);

    return (
        <div className="container">
            <h1>Ricerca Dottori in {nameSpecSelected} </h1>
            <div className="d-flex justify-content-between">
                <SearchBar />
            </div>

            <button className="btn" onClick={() => navigate(-1)}>indietro</button>
            {
                loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }
            {
                Array.isArray(dottori) ? (
                    filteredDottori.map((curElem) => (
                        <DoctorCard dottore={curElem} key={curElem.id} />
                    ))
                ) : (
                    <p>nessun dottore con questa specializzazione</p>
                )
            }
        </div>
    );
}

export default AdvancedSearch;