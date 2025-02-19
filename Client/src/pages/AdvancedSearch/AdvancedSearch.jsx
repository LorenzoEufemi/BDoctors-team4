import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import DoctorCard from "../../components/card/DoctorCard";
import SearchBar from "../../components/searchbar/Searchbar";

function AdvancedSearch() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const specializationQueryParam = queryParams.get('specialization');
    const backurl = import.meta.env.VITE_BACKEND_URL;

    const { nameSpecSelected, doctors, setDoctors, setFilters, filters, setIsSuccess, searchDoctors, handlePageChange, disableNextButton, page, error } = useContext(GlobalContext);

    const navigate = useNavigate();
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsSuccess(false);
        if (specializationQueryParam) {

            setFilters({
                ...filters,
                firstname: "",
                lastname: "",
            })
            setLoading(true);
            axios
                .get(`${backurl}specializations/${specializationQueryParam}`)
                .then((result) => {
                    setLoading(false);
                    setDoctors(result.data.data);
                })
                .catch((error) => {
                    setLoading(false);
                });
        } else {
            searchDoctors();
        }
    }, [specializationQueryParam, backurl]);


    return (
        <div className="advanced-search-container">
            <h1 className="ads-title">Ricerca {nameSpecSelected} </h1>
            <div className="d-flex justify-content-center">
            </div>
            <SearchBar />
            {error && <div className="container"><div className="alert alert-danger">{error}</div></div>}
            <button className="btn-back z-3 position-fixed rounded-3" onClick={() => navigate("/")}>
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

            <div className="d-flex justify-content-between my-4 mx-3">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="btn text-white"
                    style={{
                        backgroundColor: "rgba(23, 164, 138, 0.7)",
                        opacity: page === 1 ? 0.5 : 1, // Add opacity for disabled state
                        cursor: page === 1 ? "not-allowed" : "pointer" // Change cursor for disabled state
                    }}
                >
                    Precedente
                </button>
                <span style={{ color: "#2B6394" }}>Pagina {page}</span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={disableNextButton}
                    className="btn text-white"
                    style={{
                        backgroundColor: "rgba(23, 164, 138, 0.7)",
                        opacity: disableNextButton ? 0.5 : 1, // Add opacity for disabled state
                        cursor: disableNextButton ? "not-allowed" : "pointer" // Change cursor for disabled state
                    }}
                >
                    Successivo
                </button>
            </div>
        </div>

    );
};

export default AdvancedSearch;