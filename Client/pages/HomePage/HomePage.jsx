import axios from "axios"
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"
import GlobalContext from "../../context/GlobalContext";

function HomePage() {

    const [specializzazioni, setSpecializzazioni] = useState(null);

    const { setRicerca, setSpecializzazioneNome } = useContext(GlobalContext)

    const backurl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        axios.get(`${backurl}specializations`).then(result => {
            const newArray = result.data.data
            // console.log(newArray);
            setSpecializzazioni(newArray)
            // console.log(specializzazioni);
        })
    }, []);

    const handleSelect = (event) => {
        setSpecializzazioneNome(event.target.key)
        setRicerca(event.target.value)
    };

    return (
        <>
            <h1>ciao sono Homepage</h1>
            {
                (specializzazioni === null) ? <p>aspetta</p> :
                    <div>
                        <label htmlFor="specializzazioni">scegli la specializzazione</label>
                        <select name="specializzazioni" id="specializzazioni" onChange={handleSelect}>
                            <option value="null">--</option>
                            {
                                specializzazioni.map(curElem => (
                                    <option value={curElem.id} key={curElem.specialization}>{curElem.specialization}</option>
                                )
                                )
                            }
                        </select>
                    </div>
            }
            <Link to="/doctors">cerca</Link>
        </>
    )
};

export default HomePage;