import axios from "axios"
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext";

function HomePage() {

    const { allSpec, setSelectedSpec } = useContext(GlobalContext)

    const handleSelect = (event) => {
        setSelectedSpec(event.target.value)
        
    }

    return (
        <>
            <h1 className="text-center">ciao sono Homepage</h1>
            {
                (allSpec === null) ? <div>
                    <p>aspetta</p>
                </div> :
                    <div>
                        <label htmlFor="" className="form-control text-center">seleziona il medico per la specializzazione che ti serve</label>
                        <select  onChange={handleSelect} className="form-select" aria-label="Default select example">
                            <option value={null}>--</option>
                            {
                                allSpec.map(curElem => (
                                    <option value={curElem.id} key={curElem.specialization}>{curElem.specialization}
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