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
                    <section className="row row-col justyfy-content-between justify-content-md-center">
                        <div className=" col col-12 col-md-6 col-lg-5 col-xl-4 text-start mb-3">
                            <img src="/doc.jpg" alt="" className="rounded-3" style={{ width: "300px", height: "300px", objectFit: "cover" }} />
                        </div>
                        <div className=" col col-12 col-md-6 col-lg-7 col-xl-8">
                            <h1 style={{ color: "#2B6394" }}>{doctorDetal.firstname} {doctorDetal.lastname}</h1>
                            <i class="fa-solid fa-phone mb-2"></i><span><a href="" className="text-decoration-none"> {doctorDetal.phone}</a></span> <br />
                            <i class="fa-regular fa-at mb-2"></i> <span> <a href="" className="text-decoration-none"> {doctorDetal.email}</a></span> <br />
                            <i class="fa-solid fa-city mb-2"></i><span> {doctorDetal.city}</span> <br />
                            <i class="fa-solid fa-location-dot mb-2"></i><span> {doctorDetal.address}</span><br />
                            <i class="fa-solid fa-notes-medical mb-2"></i><span> {doctorDetal.specialization}</span><br />
                            <p>
                                <Stars vote={parseFloat(doctorDetal.vote_avg)} />
                            </p>
                        </div>
                    </section>

                    <section className="mt-4">
                        <div className="text-center mb-3">
                            <AppModal nome={doctorDetal.firstname} cognome={doctorDetal.lastname} />
                        </div>

                        <p className="d-inline-flex gap-1">
                            <button className="btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <h2 className="mb-3" style={{ color: "#2B6394" }}>Recensioni dei pazienti <span><i class="fa-solid fa-angle-down"></i></span></h2>
                            </button>
                        </p>
                        <div className="collapse" id="collapseExample">
                            {
                                Array.isArray(doctorDetal.reviews) ? (

                                    doctorDetal.reviews.map(curItem => (
                                        <div className="card mb-3 shadow-sm w-70" key={curItem.id}>
                                            <div className="">
                                                <div className="card-body">
                                                    <h5 style={{ color: "#2B6394" }} className="card-title"><strong>Scritta da:</strong> {curItem.patient}</h5>

                                                    <p className="card-text">{curItem.review}</p>
                                                    <p className="card-text">
                                                        <Stars vote={curItem.vote} />
                                                    </p>
                                                </div>
                                                <div className="card-footer">
                                                    <p className="card-text">lasciata il: {curItem.created_at.slice(0, 10)} </p>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <p>Nessuna recensione per questo dottore</p>
                                )
                            }
                        </div>
                    </section>
                </>
            )}
        </div>
    );
};

export default SingleDoctor;