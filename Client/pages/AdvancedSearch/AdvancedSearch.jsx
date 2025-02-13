import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/card/DoctorCard";

function AdvancedSearch() {
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
        if (selectedSpec) {
            setLoading(true);
            axios
                .get(`${backurl}specializations/${selectedSpec}`)
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
    }, [selectedSpec, backurl]);

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
                <form onSubmit={handleSubmit} className="d-flex gap-3">
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
                </form>
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