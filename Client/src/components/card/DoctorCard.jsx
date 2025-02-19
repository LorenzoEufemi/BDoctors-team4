import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { useState } from "react";

function DoctorCard({ dottore }) {
    const backUrl = import.meta.env.VITE_BACKEND_URL;
    const { firstname, lastname, city, phone, slug, address } = dottore;
    const { setSlugDoctor, doctors } = useContext(GlobalContext);
    console.log(doctors)
    const [click, setClick] = useState(false)
//    const[showAlert, setShowAlert] = useState(false)

    const handleHeartClick = () => {       
setClick(!click)
// setShowAlert(true)
// setTimeout(() => 
// setShowAlert(false), 3000); 
    }

    return (
        <>
        {/* {showAlert && 
                <div class="alert alert-success" role="alert">
                    A simple success alert—check it out!
                </div>
        } */}
            <div className="d-card rounded my-3" >
                <div className="row g-0">
                    <div className="col-md-4 col-12">
                        <img
                            className="d-card-img img-fluid rounded"
                            src={dottore.image ? `${backUrl}/images/${dottore.image}` : "/placeHolder.webp"}
                            alt="Dottore"
                        />
                    </div>
                    <div className="col-md-8 col-12">
                        <div className="d-card-body display: flex; flex-direction: column">
                            <div className="d-flex justify-content-between ">
                            <h5 className="d-card-header">
                                <Link
                                    to={`/doctors/${slug}`}
                                    onClick={() => setSlugDoctor(slug)}
                                    className="doctor-link">
                                    {firstname} {lastname}
                                </Link>
                            </h5>
                                {/* <i class={`fa-heart ${click ? "fa-solid red" :"fa-regular" } heart-icon`} onClick={handleHeartClick}>
                                    <span className="tooltip-text">Salva tra i preferiti</span></i> */}
                                
                        </div>
                        <p className="card-location"><i class="fa-solid fa-location-dot me-2"></i>{city}, {address}</p>
                        <p className="card-phone"> <i className="fa-solid fa-phone me-1"></i>Tel: {`+39 ${phone}`}</p>
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
        </div >
        </>
    );
};

export default DoctorCard;