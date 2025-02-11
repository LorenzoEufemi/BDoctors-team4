import { useContext, useEffect, useState } from "react";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DoctorCard from "../../components/card/DoctorCard";

function AdvancedSearch() {

    const { selectedSpec } = useContext(GlobalContext)

    const [dottori, setDottori] = useState(null)
    // console.log(specializzazioneNome);

    const navigate = useNavigate()
 


    const backurl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        axios.get(`${backurl}specializations/3`).then(result => {
            setDottori(result.data.data)
        })
    }, [])

 console.log(dottori);
 



    return (
        <>
            <h1>ciao sono AdvanceSearch </h1>
            <button onClick={() => navigate(-1)}>indietro</button>
           
               {
                    ()
               }
                
            
        </>
    )
};

export default AdvancedSearch;