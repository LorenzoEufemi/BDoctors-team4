import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext"

const HomePageCard = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const { setSlugDoctor } = useContext(GlobalContext);

    useEffect(() => {
        axios.get(`${apiUrl}doctors`).then((resp) => {
            setDoctors(resp.data.data);
        });
    }, []);

    return (
        <>
            {doctors.slice(0, 6).map((doc, index) => (
                <div className="card hp-card border-0 px-3" key={doc.id} style={{ maxWidth: "350px" }}>
                    <div className="d-flex align-items-center gap-4">
                        <img src="/doc.jpg" className="rounded-circle" style={{ maxWidth: "100px" }} alt="Foto profilo" />

                        <div className='card-text'>
                            <h6 className="mb-0 fw-bold">{doc.firstname} {doc.lastname}</h6>
                            <span className="text-muted mb-1 small">{doc.city}</span>
                            {
                                doc.specializations.map((spec) => (
                                    <p className="text-muted mb-1 small">{spec.specialization}</p>

                                ))
                            }
                            <Link to={`/doctors/:${doc.slug}`} onClick={() => { setSlugDoctor(doc.slug) }} className="text-primary small fw-semibold">Mostra profilo</Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default HomePageCard;