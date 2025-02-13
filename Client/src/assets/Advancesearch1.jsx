import { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import DoctorCard from "../../components/card/DoctorCard";

function AdvancedSearch() {
    const { selectedSpec, setSelectedSpec, nameSpecSelected, allSpec } = useContext(GlobalContext);
    const backurl = import.meta.env.VITE_BACKEND_URL;

    const [dottori, setDottori] = useState([]);
    const [filteredDottori, setFilteredDottori] = useState([]);
    const [filters, setFilters] = useState({
        firstname: "",
        lastname: "",
    });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // Recupera i medici in base alla specializzazione selezionata o tutti i medici
    useEffect(() => {
        setLoading(true);
    
        // Crea l'URL con i parametri dinamici
        let url = `${backurl}doctors`;  // URL di base per la ricerca di tutti i medici
        const params = { page, limit };
    
        // Aggiungi i filtri dinamici se presenti
        if (filters.firstname) {
            params.firstname = filters.firstname;
        }
        if (filters.lastname) {
            params.lastname = filters.lastname;
        }
        if (selectedSpec) {
            params.specialization = selectedSpec;
        }
    
        axios
            .get(url, { params })  // Passa tutti i parametri alla richiesta
            .then((result) => {
                setLoading(false);
                if (result.data.data) {
                    console.log('Medici ricevuti:', result.data.data); // Debug log
                    setDottori(result.data.data);
                    setFilteredDottori(result.data.data); // Mostra i risultati filtrati
                } else {
                    console.error("Nessun dato ricevuto dalla API.");
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Errore nella richiesta API:", error);
            });
    }, [selectedSpec, backurl, page, filters]);  // Aggiungi `filters` come dipendenza
         // Aggiungi `page` come dipendenza

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [name]: value };
            return updatedFilters;
        });
    };

    const filterDoctors = () => {
        const { firstname, lastname } = filters;

        // Se non ci sono filtri, mostra tutti i dottori
        if (!firstname && !lastname) {
            setFilteredDottori(dottori);
            return;
        }

        const filtered = dottori.filter((doctor) => {
            const matchesFirstname = firstname
                ? doctor.firstname?.toLowerCase().includes(firstname.toLowerCase())
                : true;
            const matchesLastname = lastname
                ? doctor.lastname?.toLowerCase().includes(lastname.toLowerCase())
                : true;
            return matchesFirstname && matchesLastname;
        });

        setFilteredDottori(filtered);
    };

    const handleSelect = (event) => {
        setSelectedSpec(event.target.value !== "null" ? Number(event.target.value) : null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        filterDoctors();
    };

    // Funzione per la gestione del cambio pagina
    const handlePageChange = (newPage) => {
        if (newPage >= 1) {
            setPage(newPage);
        }
    };

    // Disabilitare il pulsante "Successivo" se non ci sono più medici
    const disableNextButton = dottori.length < limit;

    useEffect(() => {
        filterDoctors();
    }, [filters, dottori]);

    return (
        <div className="container">
            <h1>Ricerca Dottori {selectedSpec ? `in ${nameSpecSelected}` : ""}</h1>

            {/* Form di selezione della specializzazione */}
            <div>
                <label htmlFor="specialization" className="text-center" style={{ color: "#2B6394" }}>
                    Seleziona la specializzazione
                </label>
                <select
                    onChange={handleSelect}
                    className="form-select mb-2"
                    value={selectedSpec || "null"}
                    aria-label="Default select example"
                >
                    <option value="null" name="">
                        -- Tutti i medici --
                    </option>
                    {allSpec?.map((curElem) => (
                        <option name={curElem.specialization} value={curElem.id} key={curElem.specialization}>
                            {curElem.specialization}
                        </option>
                    ))}
                </select>
            </div>

            {/* Form di ricerca per nome e cognome */}
            <div className="d-flex justify-content-between">
                <form onSubmit={handleSubmit} className="d-flex gap-3">
                    <div>
                        <label htmlFor="firstname">Nome:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={filters.firstname}
                            onChange={handleFilterChange}
                            placeholder="Cerca per nome"
                            className="form-control"
                        />
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
                        />
                    </div>

                    <button type="submit" className="btn" style={{ backgroundColor: "rgba(23, 164, 138, 0.6)" }}>
                        Cerca
                    </button>
                </form>
            </div>

            <button className="btn" onClick={() => window.history.back()}>
                Indietro
            </button>

            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {Array.isArray(filteredDottori) && filteredDottori.length > 0 ? (
                filteredDottori.map((curElem) => (
                    <DoctorCard dottore={curElem} key={curElem.id} />
                ))
            ) : (
                <p>Nessun medico trovato.</p>
            )}

            {/* Paginazione */}
            <div className="d-flex justify-content-between mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || !dottori.length}
                    className="btn btn-secondary"
                >
                    Precedente
                </button>
                <span>Pagina {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={disableNextButton}
                    className="btn btn-secondary"
                >
                    Successivo
                </button>
            </div>
        </div>
    );
}

export default AdvancedSearch;
