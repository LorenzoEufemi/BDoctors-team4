import { useContext } from "react"
import GlobalContext from "../../context/GlobalContext"

import { Link } from "react-router-dom"
function DoctorCard({ dottore }) {
    const { firstname, lastname, city, phone, email, slug, id} = dottore
    const { setSlugDoctor } = useContext(GlobalContext)
    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="../../public/default-placeholder-doctor-halflength-portrait-600nw-1058724875.webp" className="img-fluid rounded-start" alt="..."/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{firstname} {lastname}</h5>
                            <p className="card-text">{city}</p>
                            <p className="card-text">{phone}</p>
                            <Link to={`/doctors/${slug}`} onClick={() => setSlugDoctor(slug)} className="btn">vai al dottore</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DoctorCard