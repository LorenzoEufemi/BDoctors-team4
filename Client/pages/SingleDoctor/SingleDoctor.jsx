import { useParams } from "react-router-dom";

function SingleDoctor() {
 const { slug } = useParams();

    return (
        <>
            <h1>ciao sono un dottore</h1>
        </>
    )
};

export default SingleDoctor;