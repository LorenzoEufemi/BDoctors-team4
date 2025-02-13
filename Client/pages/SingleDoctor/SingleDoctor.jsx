import { useParams, useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppModal from "/components/AppModal/AppModal.jsx"

function SingleDoctor() {
    const { slug } = useParams();
    const navigate = useNavigate()
    const { slugDoctor, setIdDoctor, refresh } = useContext(GlobalContext)
    const backurl = import.meta.env.VITE_BACKEND_URL;

    const [doctorDetal, setDoctorDetal] = useState(null)
    const [controlli, setControlli] = useState(false)

    useEffect(() => {
        axios.get(`${backurl}doctors/${slugDoctor}`).then(result => {
            setDoctorDetal(result.data.data)
            setControlli(true)
            setIdDoctor(result.data.data.id)
        })
    }, [refresh])



    return (
        <>

            <button onClick={() => navigate(-1)} className="btn btn-danger">indietro</button>
            {
                !controlli && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }

            {controlli && (
                <>
                    <section className="text-start d-flex justify-content-between">
                        <div>
                            <h1>Nome: {doctorDetal.firstname} {doctorDetal.lastname}</h1>
                            <h2>Email: <a href="">{doctorDetal.email}</a></h2>
                            <h2>telefono: <a href="">{doctorDetal.phone}</a></h2>
                            <h2>studio in: {doctorDetal.address}</h2>
                            <h2>città: {doctorDetal.city}</h2>
                            <h2>voto dei pazienti: {parseFloat(doctorDetal.vote_avg)}</h2>
                        </div>
                        <img src="../../default-placeholder-doctor-halflength-portrait-600nw-1058724875.webp" alt="" className="w-25" />

                    </section>
                    <section>
                        {
                            Array.isArray(doctorDetal.reviews) ? (
                                
                                    doctorDetal.reviews.map(curItem => (
                                        <div className="card w-50" key={curItem.id}>
                                            <div className="card-body">
                                                <h5 className="card-title">Scritta da: {curItem.patient}</h5>
                                                <p className="card-text">{curItem.review}</p>
                                                <p className="card-text">{curItem.vote}</p>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p>Nessuna recensione per questo dottore</p>
                            )
                        }
                    </section>
                    <AppModal/>
                </>
            )}

        </>
    )
};

export default SingleDoctor;