import { useContext } from "react"
import GlobalContext from "../../context/GlobalContext"

import { Link } from "react-router-dom"
import DiconoDiNoi from "../DiconoDiNoi/DiconoDiNoi"
function DoctorCard({ dottore }) {
    const { firstname, lastname, city, phone, slug, address} = dottore
    const { setSlugDoctor } = useContext(GlobalContext)
    return (
        <>
            <div className="d-card rounded my-3" >
                <div className="row g-0">
                    <div className="col-md-4 col-12">
                        <img
                            className="d-card-img img-fluid rounded"
                            src="/doc.jpg"
                            alt="Dottore"
                        />
                    </div>
                    <div className="col-md-8 col-12">
                        <div className="d-card-body display: flex; flex-direction: column">
                            <h5 className="d-card-header">
                                <Link
                                    to={`/doctors/${slug}`}
                                    onClick={() => setSlugDoctor(slug)}
                                    className="doctor-link"
                                >
                                    {firstname} {lastname}
                                </Link>
                                
                                </h5>
                            <p className="card-location">{city}, {address}</p>
                            <p className="card-phone">Tel: {phone}</p>
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