import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext"

const HomePageCard = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);

    const { setSlugDoctor } = useContext(GlobalContext)

    useEffect(() => {
        axios.get(`${apiUrl}doctors`).then((resp) => {
            setDoctors(resp.data.data);
        });
    }, [])


    return (
        <>
            {doctors.slice(0, 6).map((doc, index) => (
                // <div className="card border-0" style={{maxWidth: "350px"}}>
                //     <div className="d-flex align-items-center">

                //         <img src="/doc.jpg" className="rounded-circle me-3" alt="Foto profilo" />


                //             <div>
                //                 <h6 className="mb-0 fw-bold">{doc.firstname} {doc.lastname}</h6>
                //                 <p className="text-muted mb-1 small">{doc.city}</p>
                //                 <p className="text-muted mb-1 small"><strong>Specializzato in: </strong>{doc.specializations}</p>
                //                 <Link to={`/doctors/:${doc.slug}`} onClick={() => { setSlugDoctor(doc.slug) }} className="btn btn-primary small fw-semibold">Dettagli</Link>
                //             </div>
                //     </div>
                // </div>
                <div className="card hp-card border-0 px-3" style={{maxWidth: "350px"}}>
                    <div className="d-flex align-items-center gap-4">
                        <img src="/doc.jpg" className="rounded-circle" style={{maxWidth: "100px"}} alt="Foto profilo" />

                            <div className='card-text'>
                                <h6 className="mb-0 fw-bold">{doc.firstname} {doc.lastname}</h6>
                                <span className="text-muted mb-1 small">{doc.city}</span>
                                <p className="text-muted mb-1 small">{doc.specializations}</p>
                                <Link to={`/doctors/:${doc.slug}`} onClick={() => { setSlugDoctor(doc.slug) }} className="text-primary small fw-semibold">Mostra profilo</Link>
                            </div>
                    </div>
                </div>
            ))}

        </>
    )
}

export default HomePageCard