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
    const { selectedSpec, nameSpecSelected, doctors, setDoctors, setFilters, filters,setIsSuccess } = useContext(GlobalContext);
    const navigate = useNavigate();

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
        }
    }, [specializationQueryParam, backurl]);

    return (
        <div className="advanced-search-container">
            <h1 className="ads-title">Ricerca Dottori in {nameSpecSelected} </h1>
            <div className="d-flex justify-content-center">
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
};

export default AdvancedSearch;