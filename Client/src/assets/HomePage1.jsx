import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext";
import SearchBar from "../../components/searchbar/Searchbar";
import TopDocs from "../../components/TopDocsHomePage/TopDocs";

function HomePage() {
    const { allSpec, setSelectedSpec, setNameSpecSelected } = useContext(GlobalContext);

    const handleSelect = (event) => {
        setSelectedSpec(event.target.value !== "null" ? Number(event.target.value) : null)
        setNameSpecSelected(event.target.options[event.target.selectedIndex].text);
    };

    useEffect(() => {
        setSelectedSpec(null)
        setNameSpecSelected("")
    }, []);

    return (
        <>
            <div className="hero-container">
                <div className="hero-content">

                    <h1 className="text-center" style={{color:" rgba(23, 164, 138, 0.7)"}}>Welcome to your BDoctors</h1>
                    {
                        (allSpec === null) ? <div>
                            <p>aspetta</p>
                        </div> :
                            <div>
                                <label htmlFor="" className=" text-center" style={{color: "#2B6394"}}>Seleziona il medico per la specializzazione che ti serve</label>
                                <select onChange={handleSelect} className="form-select mb-2" aria-label="Default select example">
                                    <option value={"null"} name={""}>--</option>
                                    {
                                        allSpec.map(curElem => (

                                            <option name={curElem.specialization} value={curElem.id} key={curElem.specialization}>{curElem.specialization}
                                            </option>
                                        ))
                                    }
                                </select>
                                <Link to="/doctors" className="btn text-white"  style={{ backgroundColor: "rgba(23, 164, 138, 0.6)"}}>cerca</Link>
                            </div>
                    }
                </div>
            </div>
            <TopDocs />
        </>
    );
};

export default HomePage;

