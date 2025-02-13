import GlobalContext from "../../context/GlobalContext";
import { useContext } from "react";

function FormReview () {

    const { hendelChangeReview, formReview, submitForm } = useContext(GlobalContext)
    const votiArray = [0,1,2,3,4,5]
    return (
        <>
        <form onSubmit={submitForm}>
            <div>
            <label htmlFor="" className="form-control">Il tuo Nome e Cognome *</label>
            <input type="text" name="patient" className="form-control" value={formReview.patient} onChange={hendelChangeReview}/>
            </div>
            <div>
            <label htmlFor="" className="form-control">Email del paziente *</label>
            <input type="text" name="email" className="form-control" value={formReview.email} onChange={hendelChangeReview}/>
            </div>
            <div>
            <label htmlFor="" className="form-control">cosa pensi di questo dottore *</label>
            <textarea name="review" id="" value={formReview.review} onChange={hendelChangeReview}></textarea>
            </div>
            <div>
            <label htmlFor="" className="form-control">Lascia un voto *</label>
            <select name="vote" id="" name="vote" className="form-control" onChange={hendelChangeReview}>
                {
                    votiArray.map(curElem => (
                        <option value={curElem} key={curElem}>{curElem}</option>
                    ))
                }
            </select>
            <button className="btn btn-success" data-bs-dismiss="modal">ok</button>
            </div>
        </form>
        </>
    )
}

export default FormReview