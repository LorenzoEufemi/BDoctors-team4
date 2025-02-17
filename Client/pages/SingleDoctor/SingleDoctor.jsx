import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppModal from "/components/AppModal/AppModal.jsx";
import Stars from "../../components/stars/Stars";

function SingleDoctor() {
    const navigate = useNavigate();
    const { slugDoctor, setIdDoctor, refresh, errorReview, setErrorReview } = useContext(GlobalContext);
    const backurl = import.meta.env.VITE_BACKEND_URL;

    const [doctorDetal, setDoctorDetal] = useState(null);
    const [controlli, setControlli] = useState(false);

    useEffect(() => {
        setErrorReview([]);
        axios.get(`${backurl}doctors/${slugDoctor}`).then(result => {
            setDoctorDetal(result.data.data);
            setControlli(true);
            setIdDoctor(result.data.data.id);
        });
    }, [refresh]);

    return (
        <div className="container py-4">
            {
                (errorReview.length > 0) &&
                (<div className="alert alert-danger d-flex justify-content-between " role="alert">
                    <div>
                        {errorReview.map((curElem, index) => (
                            <p key={index}>{curElem}</p>
                        ))}
                    </div>
                    <button className="btn-close" aria-label="Close" onClick={() => setErrorReview("")}></button>
                </div>)
            }

            <button className="btn-back z-3 position-fixed rounded-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-caret-left" style={{ color: "#4FBE89" }}></i>
            </button>
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
                    <section className="row align-items-center">
                        <div className="col-md-4 text-center">
                            <img src="/doc.jpg" alt="" className="rounded-3" style={{ width: "300px", height: "300px", objectFit: "cover" }} />
                        </div>
                        <div className="col-md-8" >
                            <h1 style={{ color: "#2B6394" }}>{doctorDetal.firstname} {doctorDetal.lastname}</h1>
                            <h4><strong>Email:</strong> <a href="">{doctorDetal.email}</a></h4>
                            <h4><strong>Telefono:</strong> <a href="">{doctorDetal.phone}</a></h4>
                            <h4><strong>Studio in:</strong> {doctorDetal.address}</h4>
                            <h4><strong>Città:</strong> {doctorDetal.city}</h4>
                            <h5><strong>Specializzato/a in:</strong> {doctorDetal.specialization}</h5>
                            <h5><strong>Voto dei pazienti: </strong>
                                <Stars vote={parseFloat(doctorDetal.vote_avg)} />
                            </h5>
                        </div>
                    </section>

                    <section className="mt-4">
                        <div className="text-center mb-3">
                            <AppModal nome={doctorDetal.firstname} cognome={doctorDetal.lastname} />
                        </div>

                        <h2 className="mb-3" style={{ color: "#2B6394" }}>Recensioni dei pazienti</h2>
                        {
                            Array.isArray(doctorDetal.reviews) ? (

                                doctorDetal.reviews.map(curItem => (
                                    <div className="card mb-3 shadow-sm w-70 d-flex" key={curItem.id}>
                                        <div className="row row-cols">

                                            <div className="card-body col-8 mx-3">
                                                <h5 style={{ color: "#2B6394" }} className="card-title"><strong>Scritta da:</strong> {curItem.patient}</h5>

                                                <p className="card-text">{curItem.review}</p>
                                                <p className="card-text">
                                                    <Stars vote={curItem.vote} />
                                                </p>
                                            </div>
                                            <div className="card-body col-3">
                                                <p className="card-text text-end mx-3">lasciata il: {curItem.created_at.slice(0, 10)} </p>
                                            </div>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p>Nessuna recensione per questo dottore</p>
                            )
                        }
                    </section>
                </>
            )}
        </div>
    );
};

export default SingleDoctor;