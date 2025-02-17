import GlobalContext from "../../context/GlobalContext";
import { useContext, useEffect } from "react";
import { useRef } from "react";

function FormReview() {
    const { hendelChangeReview, formReview, submitForm } = useContext(GlobalContext);
    const votiArray = [0, 1, 2, 3, 4, 5];
    const selfRef = useRef(null);

    useEffect(() => {
        if (selfRef.current) {
            selfRef.current.value = formReview.vote
        }
    });

    return (
        <>
            <form onSubmit={submitForm}>
                <div className="container mb-3">
                    <label htmlFor="" className="">Inserisci Nome e Cognome*</label>
                    <input type="text" name="patient" className="form-control text-center fw-lighter"
                        placeholder="inserisci nome e cognome..." value={formReview.patient} onChange={hendelChangeReview} />
                </div>
                <div className="container mb-3">
                    <label htmlFor="" className="">Inserisci la tua Email*</label>
                    <input type="text" name="email" className="form-control text-center"
                        placeholder="inserisci email..." value={formReview.email} onChange={hendelChangeReview} />
                </div>
                <div className="container d-flex flex-column align-items-center">
                    <label htmlFor="" className="">Scegli Voto*</label>
                    <select name="vote" id="" className="form-select form-select-sm text-center w-25 mb-3" aria-label="Small select example" ref={selfRef} onChange={hendelChangeReview}>
                        {
                            votiArray.map(curElem => (
                                <option value={curElem} key={curElem}>{curElem}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label htmlFor="">Cosa ne pensi di questo dottore?*</label>
                    <textarea name="review" id="" className="form-control mb-3" value={formReview.review} onChange={hendelChangeReview}></textarea>
                </div>
                <p className="text-danger">*Campi obbligatori</p>

                <button className="btn text-white" style={{ backgroundColor: "#4FBE89" }} data-bs-dismiss="modal">Invia recensione</button>
            </form>
        </>
    );
};

export default FormReview;