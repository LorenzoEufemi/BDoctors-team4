import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext"

function HomePageCard() {

    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([]);
    const { setSlugDoctor, setError} = useContext(GlobalContext);

    useEffect(() => {
        setError("")
        axios.get(`${apiUrl}doctors`).then((resp) => {
            setDoctors(resp.data.data);
        });
    }, [setError, apiUrl]);

    return (
        <>
            {doctors.slice(0, 6).map((doc, index) => (
                <div className="card hp-card d-flex align-items-center justify-content-center py-2 m-0" key={doc.id}>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <div className='d-flex align-items-center' style={{ width: "30%" }}>
                            <img
                                src={doc.image ? `${apiUrl}/images/${doc.image}` : "https://picsum.photos/400/400"}
                                className="rounded-circle"
                                alt="Foto profilo"
                            />
                        </div>

                        <div className='card-text' style={{ width: "65%" }}>
                            <h6 className="mb-0 fw-bold">{doc.firstname} {doc.lastname}</h6>
                            <span className="text-muted small">{doc.city}</span>
                            <div className='d-flex gap-1 flex-wrap'>
                                {
                                    doc.specializations.map((spec, index) => (
                                        <span className="text-muted small" key={index}>{spec.specialization}</span>

                                    ))
                                }
                            </div>
                            <Link to={`/doctors/:${doc.slug}`} onClick={() => { setSlugDoctor(doc.slug) }} className="text-primary small fw-semibold">Mostra profilo</Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default HomePageCard;