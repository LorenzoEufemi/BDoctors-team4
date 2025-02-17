import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext";
import TopDocs from "../../components/TopDocsHomePage/TopDocs";
import DiconoDiNoi from "../../components/DiconoDiNoi/DiconoDiNoi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
    const { allSpec, setSelectedSpec, setNameSpecSelected, selectedSpec, handleSelect } = useContext(GlobalContext);

    useEffect(() => {
        setSelectedSpec(null)
        setNameSpecSelected("")
    }, []);

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
                                    <select onChange={() => handleSelect(event)} className="form-select mb-2" aria-label="Default select example">
                                        <option value={"null"} name={""}>--</option>
                                        {
                                            allSpec.map(curElem => (

                                                <option name={curElem.specialization} value={curElem.id} key={curElem.specialization}>{curElem.specialization}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <Link  to={`/doctors/?specialization=${selectedSpec}`} className="btn text-white mt-3 ms-2" style={{ backgroundColor: "rgba(23, 164, 138, 0.6)" }}>cerca</Link>
                                </div>
                            </div>
                    }
                </div>
            </div>
            <div className="spacing" style={{ height: "90px" }}></div>
            <TopDocs />
            <DiconoDiNoi />
        </>
    );
};

export default HomePage;

