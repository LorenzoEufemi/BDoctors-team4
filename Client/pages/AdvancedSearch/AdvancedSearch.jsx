import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/card/DoctorCard";

function AdvancedSearch() {
    const backurl = import.meta.env.VITE_BACKEND_URL;
    const { selectedSpec, nameSpecSelected } = useContext(GlobalContext);
    const navigate = useNavigate();

    const [dottori, setDottori] = useState([]);
    const [filteredDottori, setFilteredDottori] = useState([]);
    const [filters, setFilters] = useState({
        name: '',
        surname: '',
        specialization: '',
    });
    const [loading, setLoading] = useState(false);
    // Carica i dottori all'inizializzazione o quando cambia selectedSpec
    useEffect(() => {
        if (selectedSpec) {
            setLoading(true);
            axios
                .get(`${backurl}specializations/${selectedSpec}`)
                .then((result) => {
                    setLoading(false);
                    setDottori(result.data.data);
                    setFilteredDottori(result.data.data); // inizialmente tutti i dottori
                })
                .catch((error) => { setLoading(false); console.error('Errore nella richiesta API:', error) });
        }


    }, [selectedSpec]);

    // Funzione per aggiornare i filtri
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [name]: value };
            console.log("Filtri aggiornati:", updatedFilters);
            return updatedFilters;
        });
    };

    // Funzione di filtraggio
    const filterDoctors = () => {
        const { name, surname, specialization } = filters;

        // Se i filtri sono vuoti, non filtriamo nulla
        if (!name && !surname && !specialization) {
            setFilteredDottori(dottori);
            return;
        }

        const filtered = dottori.filter((doctor) => {
            const matchesName = doctor.firstname?.toLowerCase().includes(name.toLowerCase());
            const matchesSurname = doctor.lastname?.toLowerCase().includes(surname.toLowerCase());
            const matchesSpecialization = doctor.specialization?.toLowerCase().includes(specialization.toLowerCase());

            return matchesName && matchesSurname && matchesSpecialization;
        });

        setFilteredDottori(filtered);
    };
    const handleSubmit = (event) => {
        event.preventDefault(); // Impedisce il refresh della pagina
        filterDoctors(); // Esegue il filtraggio
    };

    // Chiamata di filtraggio ogni volta che cambiano i filtri
    // useEffect(() => {
    //     filterDoctors();
    // }, [filters]);

    return (
        <>
            <h1>Ricerca Dottori</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={filters.name}
                    onChange={handleFilterChange}
                    placeholder="Cerca per nome"
                />

                <label htmlFor="surname">Cognome:</label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={filters.surname}
                    onChange={handleFilterChange}
                    placeholder="Cerca per cognome"
                />

                <label htmlFor="specialization">Specializzazione:</label>
                <input
                    type="text"
                    id="specialization"
                    name="specialization"
                    value={filters.specialization}
                    onChange={handleFilterChange}
                    placeholder="Cerca per specializzazione"
                />

                <button type="submit">Filtra</button> {/* Il bottone usa onSubmit */}
            </form>
            <h1>ciao sono AdvanceSearch {nameSpecSelected}</h1>
            <button onClick={() => navigate(-1)}>indietro</button>
            {(loading) && <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            {filteredDottori && filteredDottori.length > 0 ? (
                filteredDottori.map(curItem => (
                    <section key={curItem.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{curItem.firstname} {curItem.lastname}</h5>
                                <p className="card-text">{curItem.address}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </section>
                ))
            ) : (Array.isArray(dottori) && dottori.length > 0) ? (
                dottori.map(curItem => (
                    <section key={curItem.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{curItem.firstname} {curItem.lastname}</h5>
                                <p className="card-text">{curItem.address}</p>
                                <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </section>
                ))
            ) : (!loading && <p>dottori non trovati</p>

            )}
        </>
    )
}


export default AdvancedSearch;