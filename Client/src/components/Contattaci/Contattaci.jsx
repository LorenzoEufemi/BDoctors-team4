import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';

function Contattaci() {
    const {setIsSuccess} = useContext(GlobalContext);

    useEffect(() => {
        setIsSuccess(false);
    },[]);

    const navigate = useNavigate()
    return (
        <div className="contact-container my-5">
            <h1 className='contact-title' >Contattaci</h1>
            <hr className="divider" />
            {/* Prima riga */}
            <div className="row align-items-center mb-5">
                <div className="col-md-6 contact-text">
                    <h2>Contattaci direttamente online</h2>
                    <p>Se hai domande o desideri maggiori informazioni, siamo a tua disposizione.</p>
                    <a href="mailto:info@example.com" className="btn btn-contact mb-3 text-decoration-none">Contattaci via email</a>
                </div>
                <div className="col-md-6 contact-card">
                    <img src="/img/contact1.png" alt="Contattaci online" className="img-fluid" />
                </div>
            </div>
            <button className="btn-back z-3 position-fixed rounded-3" onClick={() => navigate(-1)}>
                <i className="fa-solid fa-caret-left" style={{ color: "#4FBE89" }}></i>
            </button>
            {/* Seconda riga - ordine invertito */}
            <div className="row align-items-center mb-5 d-flex">
                <div className="col-md-6 contact-card">
                    <img src="/img/contact2.jpg" alt="Contattaci per telefono" className="img-fluid" />
                </div>
                <div className="col-md-6 contact-text">
                    <h2>Contattaci per telefono</h2>
                    <p>Parla con un nostro esperto. Siamo sempre disponibili per aiutarti.</p>
                    <a href="tel:+1234567890" className="btn btn-contact text-decoration-none">Chiama ora</a>
                </div>
            </div>

            {/* Terza riga */}
            <div className="row align-items-center mb-5">
                <div className="col-md-6 contact-text">
                    <h2>Contattaci via Email</h2>
                    <ul>
                        <li><a href="mailto:info@example.com">info@example.com</a></li>
                        <li><a href="mailto:support@example.com">support@example.com</a></li>
                    </ul>
                </div>
                <div className="col-md-6 contact-card">
                    <img src="/img/contact3.jpg" alt="Email" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

export default Contattaci;