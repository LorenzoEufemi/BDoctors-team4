import { useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext";

function HomePage() {

    const { allSpec, setSelectedSpec, setNameSpecSelected } = useContext(GlobalContext)

    const handleSelect = (event) => {

        console.log(event.target.options[event.target.selectedIndex].text);

        setSelectedSpec(event.target.value !== "null" ? Number(event.target.value) : null)
        setNameSpecSelected(event.target.options[event.target.selectedIndex].text);

    }
    useEffect(() => {
        setSelectedSpec(null)
    }, []);
    return (
        <>
            <h1 className="text-center">ciao sono Homepage</h1>
            {
                (allSpec === null) ? <div>
                    <p>aspetta</p>
                </div> :
                    <div>
                        <label htmlFor="" className="form-control text-center">seleziona il medico per la specializzazione che ti serve</label>
                        <select onChange={handleSelect} className="form-select" aria-label="Default select example">
                            <option value={"null"} name={""}>--</option>
                            {
                                allSpec.map(curElem => (

                                    <option name={curElem.specialization} value={curElem.id} key={curElem.specialization}>{curElem.specialization}
                                    </option>
                                ))
                            }

                        </select>

                        <Link to="/doctors" className="btn btn-primary">cerca</Link>
                    </div>
            }

        </>
    )
};

export default HomePage;