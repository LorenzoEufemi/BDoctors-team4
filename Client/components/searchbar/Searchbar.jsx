import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

function SearchBar() {

    // context
    const { allSpec, filters, loading, error, page, searching, handleInputChange, handleSubmit, searchDoctors, handleSelect, setFilters, setSelectedSpec, setNameSpec } = useContext(GlobalContext);   

    // Quando i filters o la pagina cambiano, resettiamo i medici
    useEffect(() => {
       console.log("cane")
       console.log("filters:", filters)
       console.log("page:", page)
       console.log("searching:", searching)
        if (searching) {
            searchDoctors();
        }
    }, [page, searching]);

    const handleSelectSearch = (event) => {
        setNameSpec(event.target.options[event.target.selectedIndex].text)
       
        setFilters((prevFilters) => ({
          ...prevFilters,
          specialization: event.target.value,
        }));
      };

    return (
        <div className="container mt-4">
            <h1>Ricerca Dottori</h1>
            <form onSubmit={() => handleSubmit(event)} className="d-flex gap-3 mb-4">


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
                        onChange={() => handleInputChange(event)}
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
                        onChange={() => handleInputChange(event)}
                        placeholder="Cognome"
                        className="form-control"
                    />
                </div>

                {/* Specializzazione Select */}
                <div className="mb-3 w-25">
                    <label htmlFor="specialization" className="form-label">
                        Specializzazione:
                    </label>
                    <select
                        name="specialization"
                        value={filters.specialization}
                        onChange={() => handleSelectSearch(event)}
                        className="form-select"
                    >
                        <option value="">-- Seleziona una specializzazione --</option>
                        {allSpec && allSpec.map((spec) => (
                            <option key={spec.id} value={spec.id}>
                                {spec.specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn text-white align-self-center mt-3" style={{ backgroundColor: "rgba(23, 164, 138, 0.6)" }}>
                    Cerca
                </button>
            </form>

            {loading && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}

            {error && <div className="alert alert-danger">{error}</div>}

            {/* <div>
                {doctors.length === 0 && !loading && searching && <p>Nessun dottore trovato.</p>}
                {searching && (
                    <ul className="list-group">
                        {doctors.map((doctor) => (
                            <li key={doctor.id} className="list-group-item d-flex justify-content-between">
                                {doctor.firstname} {doctor.lastname} - {doctor.specializations}
                                <Link className="btn" to={`/doctors/${doctor.slug}`} onClick={() => { setSlugDoctor(doctor.slug) }}>dettagli</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="d-flex justify-content-between mt-4">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || !searching}
                    className="btn btn-secondary"
                >
                    Precedente
                </button>
                <span>Pagina {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={disableNextButton || !searching}
                    className="btn btn-secondary"
                >
                    Successivo
                </button>
            </div> */}
        </div>
    );
}

export default SearchBar;
