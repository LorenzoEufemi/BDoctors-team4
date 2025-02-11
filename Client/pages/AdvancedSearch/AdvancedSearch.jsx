import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdvancedSearch() {

    const { ricerca, specializzazioneNome } = useContext(GlobalContext)

    const [dottori, setDottori] = useState(null)
    // console.log(specializzazioneNome);

    const navigate = useNavigate()

    const backurl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        axios.get(`${backurl}specializzazioni/${ricerca}`).then(result => {
            setDottori(result.data.data)
        })
    }, [])

    return (
        <>
            <h1>ciao sono AdvanceSearch {specializzazioneNome}</h1>
            <button onClick={() => navigate(-1)}>indietro</button>
            {
                (dottori === null) ?
                    (<p>loading...</p>) :
                    (dottori.map(curElem => (
                        <div key={curElem.id}>
                            <p>{curElem.nome}</p>
                            <p>{curElem.cognome}</p>
                        </div>
                    )))
            }
        </>
    )
};

export default AdvancedSearch;