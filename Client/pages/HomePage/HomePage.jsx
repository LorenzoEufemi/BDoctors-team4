import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext";
import TopDocs from "../../components/TopDocsHomePage/TopDocs";

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

                    <h1 className="text-center" style={{color:" rgba(23, 164, 138, 0.7)"}}>Benvenuto su BDoctors</h1>
                    {
                        (allSpec === null) ? <div>
                            <p>aspetta</p>
                        </div> :
                            <div>
                                <label htmlFor="" className=" text-center" style={{color: "#2B6394"}}>Seleziona il medico per la specializzazione che ti serve</label>
                                <select onChange={() => handleSelect(event)} className="form-select mb-2" aria-label="Default select example">
                                    <option value={"null"} name={""}>--</option>
                                    {
                                        allSpec.map(curElem => (
                                     
                                            <option name={curElem.specialization} value={curElem.id} key={curElem.specialization}>{curElem.specialization}
                                            </option>
                                        ))
                                    }
                                </select>
                                <Link to={`/doctors/?specialization=${selectedSpec}`} className="btn text-white"  style={{ backgroundColor: "rgba(23, 164, 138, 0.6)"}}>cerca</Link>
                            </div>
                    }
                </div>
            </div>
            <TopDocs />
        </>
    );
};

export default HomePage;

