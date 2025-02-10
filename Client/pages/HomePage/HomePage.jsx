import axios from "axios"
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext";

function HomePage() {

    const [specializzazioni, setSpecializzazioni] = useState(null);
    
    const { setRicerca } = useContext(GlobalContext)
    
    const backurl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        axios.get(`${backurl}specializzazioni`).then(result => {
            const newArray = result.data.data
            // console.log(newArray);
            setSpecializzazioni(newArray)
            // console.log(specializzazioni);
        })
    }, [])
    



    return (
        <>
            <h1>ciao sono Homepage</h1>
            {
                (specializzazioni === null) ? <p>aspetta</p> : 
                <div>
                <label htmlFor="specializzazioni">scegli la specializzazione</label>
                <select name="specializzazioni" id="" onChange={(event) => setRicerca(event.target.value)}>
                    <option value="null">--</option>
                    {
                        specializzazioni.map(curElem => (
                            <option value={curElem.specializzazione} key={curElem.id}>{curElem.specializzazione}</option>
                        )
                        )  
                    }
                </select>
                </div>
            }
            <Link to="/dottori">cerca</Link>
        </>
    )
};

export default HomePage;