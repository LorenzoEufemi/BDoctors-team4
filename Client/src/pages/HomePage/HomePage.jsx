import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import TopDocs from "../../components/TopDocsHomePage/TopDocs";
import DiconoDiNoi from "../../components/DiconoDiNoi/DiconoDiNoi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const { isSuccess, setIsSuccess, allSpec, setSelectedSpec, setNameSpecSelected, selectedSpec, handleSelect, setFilters, setPage} = useContext(GlobalContext);
    
    const defaultFilter = {
        firstname: "",
        lastname: "",
        specialization: null
    }


    useEffect(() => {
        setSelectedSpec(null)
        setNameSpecSelected("")
        setFilters(defaultFilter)
        setPage(1);
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSuccess(false);
        }, 5000);
        return () => clearTimeout(timer)
    }, []);

    const handleSearch = (event) => {
        console.log(event);
    };

 

    return (
        <>
            <div className="hero-container">
                <div className="hero-content">
                    <h1 className="text-center testo-lungo" style={{ color: " rgba(23, 164, 138, 0.7)" }}>Benvenuto su BDoctors</h1>
                    <h1 className="text-center testo-corto" style={{ color: " rgba(23, 164, 138, 0.7)" }}>Benvenuto </h1>
                    {
                        (allSpec === null) ? <div>
                            <p>aspetta</p>
                        </div> :
                            <div className="d-flex align-items-center">
                                <div>
                                    <label htmlFor="" className="testo-lungo text-center" style={{ color: "#2B6394" }}>Seleziona il medico per la specializzazione che ti serve</label>
                                    <label htmlFor="" className="testo-corto text-center" style={{ color: "#2B6394" }}>Seleziona la specializzazione </label>
                                    <label htmlFor="" className="testo-cortissimo text-center" style={{ color: "#2B6394" }}>Specializzazione</label>
                                    <select onChange={() => handleSelect(event)} className="form-select mb-2 homeSearchBar-input" aria-label="Default select example">
                                        <option value={"null"} name={""}>Tutti i dottori</option>
                                        {
                                            allSpec.map(curElem => (
                                                <option name={curElem.specialization} value={curElem.id} key={curElem.specialization}>{curElem.specialization}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <Link to={`/doctors?${selectedSpec ? "specialization=" + selectedSpec : ""} `} onClick={() => handleSearch(event)} className="btn text-white mt-3 ms-2 home-btn" style={{ backgroundColor: "rgba(23, 164, 138, 0.6)" }}>cerca</Link>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="spacing" style={{ height: "90px" }}></div>
            {
                isSuccess && (
                    <div className="alert alert-success row justify-content-between " role="alert">
                        <div className="col-11">
                            <p className="text-center">Dottore aggiunto con successo!</p>
                        </div>
                        <button className="btn-close col-1" aria-label="Close" onClick={() => setIsSuccess(false)}></button>
                    </div>
                )
            }
            <TopDocs />
            <DiconoDiNoi />
        </>
    );
};

export default HomePage;