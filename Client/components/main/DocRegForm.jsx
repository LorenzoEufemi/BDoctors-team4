import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const initialData = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    image: null,
    resume: null,
    specializations: [],
}


const DocRegForm = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const [formData, setFormData] = useState(initialData)

    const [special, setSpecial] = useState([])

    //chiamata specializzazioni
    useEffect(() => {
        axios.get(`${apiUrl}specializations`).then((resp) => {
            console.log(resp)
            setSpecial(resp.data.data)
        })
    }, []);


    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === "file") {
            const fileImg = event.target.files[0];
            const resumeFile = event.target.files[1];
            const newData = { ...formData, image: fileImg, resume: resumeFile };
            setFormData(newData)
        } else {
            const newData = { ...formData, [name]: value }
            setFormData(newData)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //creiamo oggetto formadata per simulare form -non usiamo json
        const dataToSend = new FormData()

        for (let key in formData) {
            dataToSend.append(key, formData[key])
        }

        axios.post(`${apiUrl}doctors`, dataToSend, {

            //diciamo al server che tra i dati c`e`anche un file
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((resp) => {
            console.log(resp)
            navigate("/")
        })
    };

    return (

        <form className='d-flex flex-column gap-3' onSubmit={handleSubmit}>

            {/* Input Nome */}
            <div className=''>
                <label htmlFor="firstname">Nome</label>
                <input
                    id='firstname'
                    className='form-control'
                    type="text"
                    placeholder='scrivi il tuo nome'
                    name='firstname'
                    value={formData.firstname}
                    onChange={handleChange} />
            </div>

            {/* Input Cognome */}
            <div>
                <label htmlFor="lastname">Cognome</label>
                <input
                    id='lastname'
                    className='form-control'
                    type="text"
                    placeholder='scrivi il tuo Cognome'
                    name='lastname'
                    value={formData.lastname}
                    onChange={handleChange} />
            </div>

            {/* Input Email */}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id='Email'
                    className='form-control'
                    type="text"
                    placeholder='scrivi la tua email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange} />
            </div>

            {/* Input Indirizzo */}
            <div>
                <label htmlFor="address">Indirizzo</label>
                <input
                    id='address'
                    className='form-control'
                    type="text"
                    placeholder='scrivi il tuo indirizzo'
                    name='address'
                    value={formData.address}
                    onChange={handleChange} />
            </div>

            {/* Input Città */}
            <div>
                <label htmlFor="city">Citta'</label>
                <input
                    id='city'
                    className='form-control'
                    type="text"
                    placeholder='scrivi la tua citta'
                    name='city'
                    value={formData.city}
                    onChange={handleChange} />
            </div>

            {/* Input Telefono */}
            <div>
                <label htmlFor="phone">Telefono</label>
                <input
                    id='phone'
                    className='form-control'
                    type="text"
                    placeholder='scrivi il tuo telefono'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange} />
            </div>

            {/* Input imagine */}
            <div>
                <label htmlFor="file">Immagine Profilo</label>
                <input
                    id='file'
                    className='form-control'
                    type="file"
                    placeholder='carica la tua immagine'
                    name='immagine'
                    onChange={handleChange} />
            </div>

            {/* Input CV */}
            <div>
                <label htmlFor="file">Curriculum</label>
                <input
                    id='file'
                    className='form-control'
                    type="file"
                    placeholder='carica il tuo CV'
                    name='resume'
                    onChange={handleChange} />
            </div>

            {/* Input Specializzazione */}

            <label>Scegli una o più specializzazioni</label>
            <div className='d-flex flex-wrap justify-content-between'>
                {special.map((spec, index) => (
                    //al server mando id specializzazione
                    <div key={index} className="form-check form-check-inline col-3">
                        <input
                            key={spec.id}
                            className="form-check-input"
                            type="checkbox"
                            id="checkbox"
                            value={spec.id}
                        />
                        <label htmlFor="specializations" className="form-check-label" for="inlineCheckbox1">{spec.specialization}</label>
                    </div>
                ))}
            </div>

            {/* <div>
                <label htmlFor="specializations">Seleziona una specializzazione</label>
                <select multiple id='specializations'
                    name='specializations'
                    className='form-select form-select-lg'
                    value={formData.specializations}
                    onChange={handleChange}>
                    {special.map((spec) => (
                        //al server mando id specializzazione
                        <option key={spec.id} value={spec.id}>{spec.specialization}</option>
                    ))}
                </select>
            </div> */}

            <div>
                <button className="btn btn-primary" type='submit'>Salva i dati</button>
            </div>
        </form>
    );
};

export default DocRegForm;