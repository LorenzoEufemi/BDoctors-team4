import { useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const { allSpec, filters, loading, error, page, limit, searching, handleInputChange, handleSubmit, searchDoctors, setFilters, setNameSpec } = useContext(GlobalContext);
    const navigate = useNavigate()

    // Quando i filters o la pagina cambiano, resettiamo i medici
    useEffect(() => {
        if (searching) {
            searchDoctors();
        }
    }, [page, searching, limit]);

    const handleSelectSearch = (event) => {
        setNameSpec(event.target.options[event.target.selectedIndex].text);
        setFilters((prevFilters) => ({
            ...prevFilters,
            specialization: event.target.value,
        }));
    };
    
    const handleFormSubmit = (event) => {
        event.preventDefault(); // Previene il comportamento predefinito del form
        handleSubmit(event); // Chiama la funzione handleSubmit dal contesto
        navigate(`/doctors/?specialization=${filters.specialization}`); // <-- Aggiorna l'URL
    };

    return (
        <div className="container mt-4 searchBar-container">
            <form onSubmit={handleFormSubmit} className="d-flex gap-3 mb-4 ">

                {/* Nome Input */}
                <div className="mb-3 w-25">
                    <label htmlFor="firstname" className="form-label fs-5">
                        Nome:
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={filters.firstname}
                        onChange={() => handleInputChange(event)}
                        placeholder="Nome"
                        className="form-control searchBar-input"
                    />
                </div>

                {/* Cognome Input */}
                <div className="mb-3 w-25">
                    <label htmlFor="lastname" className="form-label fs-5">
                        Cognome:
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={filters.lastname}
                        onChange={() => handleInputChange(event)}
                        placeholder="Cognome"
                        className="form-control searchBar-input"
                    />
                </div>

                {/* Specializzazione Select */}
                <div className="mb-3 w-25 ">
                    <label htmlFor="specialization" className="form-label fs-5">
                        Specializzazione:
                    </label>
                    <select
                        name="specialization"
                        value={filters.specialization}
                        onChange={() => handleSelectSearch(event)}
                        className="form-select searchBar-input"
                    >
                        <option value="">Tutti i dottori</option>
                        {allSpec && allSpec.map((spec) => (
                            <option key={spec.id} value={spec.id}>
                                {spec.specialization}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn text-white align-self-center mt-3 searchBar-btn">
                    Cerca
                </button>
            </form>
            {loading && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
           
        </div>
    );
};

export default SearchBar;