import { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";

function AdvancedSearch() {

    const {ricerca} = useContext(GlobalContext)
    console.log(ricerca);

    useEffect(() => {

    }, [])
    

    return (
        <>
            <h1>ciao sono AdvanceSearch {ricerca}</h1>
        </>
    )
};

export default AdvancedSearch;