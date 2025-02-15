import { useContext } from "react"
import GlobalContext from "../../context/GlobalContext"

import { Link } from "react-router-dom"
function DoctorCard({ dottore }) {
    const { firstname, lastname, city, phone, email, slug, id} = dottore
    const { setSlugDoctor } = useContext(GlobalContext)
    return (
        <>
            <div className="d-card rounded my-3" style={{ backgroundColor: "#CFE7DE" }}>
                <div className="row g-0">
                    <div className="col-md-4 img-container">
                        <img
                            src="/doc.jpg"
                            className="img-fluid rounded-start"
                            alt="Dottore"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="d-card-header">{firstname} {lastname}</h5>
                            <p className="card-location">{city}</p>
                            <p className="card-phone">{phone}</p>
                            <Link
                                to={`/doctors/${slug}`}
                                onClick={() => setSlugDoctor(slug)}
                                className="btn-design"
                            >
                                Vai al dottore
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorCard