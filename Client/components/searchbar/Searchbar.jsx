import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchBar() {
    const backurl = import.meta.env.VITE_BACKEND_URL;
    const [filters, setFilters] = useState({
        firstname: "",
        lastname: "",
        specialization: "",
    }); 
    
    // Stato per i filtri di ricerca
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10); // Limite di medici per pagina

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        searchDoctors();
    };

    const searchDoctors = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`${backurl}doctors`, {
                params: { ...filters, page, limit },
            });

            setDoctors(response.data.data);
        } catch (error) {
            setError("Errore nella ricerca dei dottori.");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
        searchDoctors(); // Ricarica i risultati quando cambia la pagina
    };

    // Disabilitare il pulsante "Successivo" se non ci sono più medici
    const disableNextButton = doctors.length < limit;

    return (
        <div className="container mt-4">
            <h1>Ricerca Dottori</h1>
            <form onSubmit={handleSubmit} className="d-flex gap-3 mb-4">
                
                {/* Nome Input */}
                <div className="mb-3 w-25">
                    <label htmlFor="firstname" className="form-label">
                        Nome:
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={filters.firstname}
                        onChange={handleInputChange}
                        placeholder="Nome"
                        className="form-control"
                    />
                </div>

                {/* Cognome Input */}
                <div className="mb-3 w-25">
                    <label htmlFor="lastname" className="form-label">
                        Cognome:
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={filters.lastname}
                        onChange={handleInputChange}
                        placeholder="Cognome"
                        className="form-control"
                    />
                </div>

                {/* Specializzazione Input */}
                <div className="mb-3 w-25">
                    <label htmlFor="specialization" className="form-label">
                        Specializzazione:
                    </label>
                    <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={filters.specialization}
                        onChange={handleInputChange}
                        placeholder="Specializzazione"
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary align-self-end">
                    Cerca
                </button>
            </form>

            {loading && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            <div>
                {doctors.length === 0 && !loading && <p>Nessun dottore trovato.</p>}
                <ul className="list-group">
                    {doctors.map((doctor) => (
                        <li key={doctor.id} className="list-group-item d-flex justify-content-between">
                            {doctor.firstname} {doctor.lastname} - {doctor.specializations}
                            <Link className="btn" to={`/doctors/${doctor.slug}`}>dettagli</Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="btn btn-secondary"
                >
                    Precedente
                </button>
                <span>Pagina {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={disableNextButton} // Disabilita se non ci sono più medici
                    className="btn btn-secondary"
                >
                    Successivo
                </button>
            </div>
        </div>
    );
};

export default SearchBar;