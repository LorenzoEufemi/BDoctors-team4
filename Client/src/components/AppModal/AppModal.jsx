import React from 'react';
import FormReview from '../formReview/FormReview';
import GlobalContext from "../../context/GlobalContext";
import { useContext } from 'react';

function AppModal({ nome, cognome }) {
    const { resetFormReviw } = useContext(GlobalContext)

    return (
        <>
            {/* < !--Button trigger modal-- > */}
            <button style={{ backgroundColor: "#4FBE89" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Lascia una recensione al dottor {nome} {cognome}
            </button>

            {/* <!--Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header text-white" style={{ backgroundColor: "#2B6394" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Recensione per il dottor {nome} {cognome}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetFormReviw}></button>
                        </div>
                        <div className="modal-body">
                            <FormReview />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AppModal;