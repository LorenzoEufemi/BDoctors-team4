import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"

const initialData = {
    nome: "",
    cognome: "",
    email: "",
    via: "",
    citta: "",
    telefono: "",
    immagine: null,
    specializzazione: [],
}


const DocRegForm = () => {

    const apiUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const [formData, setFormData] = useState(initialData)

    const [special, setSpecial] = useState([])

    //chiamata specializzazioni

useEffect(() => {
    
    axios.get(`${apiUrl}/specializzazioni`).then((resp) => {
        console.log(resp)
        setSpecial(resp.data.data)
    })

}, []);

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === file) {
            const fileImg = event.target.files[0]
            const newData = { ...formData, immagine: fileImg };
            setFormData(newData)
        } else {
            const newData = { ...formData, [name]: value }
            setFormData(newData)
        }
    }

    const handleSubmit = (e) => {
        event.preventDefault();
        //creiamo oggetto formadata per simulare form -non usiamo json
        const dataToSend = new FormData()

        for (let key in formData) {
            dataToSend.append(key, formData[key])
        }

        axios.post(`${apiUrl}dottori`, dataToSend, {
            //diciamo al server che tra i dati c`e`anche un file
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((resp) => {
            navigate("/")
        })
    }

    return (

        <form onSubmit={handleSubmit}>

            {/* Input Nome */}
            <div>
                <label htmlFor="nome">Nome</label>
                <input
                    id='nome'
                    type="text"
                    placeholder='scrivi il tuo nome'
                    name='nome'
                    value={formData.nome}
                    onChange={handleChange} />
            </div>
            {/* Input Cognome */}
            <div>
                <label htmlFor="Cognome">Cognome</label>
                <input
                    id='Cognome'
                    type="text"
                    placeholder='scrivi il tuo Cognome'
                    name='Cognome'
                    value={formData.cognome}
                    onChange={handleChange} />
            </div>
            {/* Input Nome */}
            <div>
                <label htmlFor="nome">Email</label>
                <input
                    id='Email'
                    type="text"
                    placeholder='scrivi la tua email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange} />
            </div>
            {/* Input Nome */}
            <div>
                <label htmlFor="nome">Indirizzo</label>
                <input
                    id='via'
                    type="text"
                    placeholder='scrivi il tuo indirizzo'
                    name='via'
                    value={formData.via}
                    onChange={handleChange} />
            </div>
            {/* Input Nome */}
            <div>
                <label htmlFor="citta">Citta'</label>
                <input
                    id='citta'
                    type="text"
                    placeholder='scrivi la tua citta'
                    name='citta'
                    value={formData.citta}
                    onChange={handleChange} />
            </div>
            {/* Input Nome */}
            <div>
                <label htmlFor="telefono">Telefono</label>
                <input
                    id='telefono'
                    type="text"
                    placeholder='scrivi il tuo telefono'
                    name='telefono'
                    value={formData.telefono}
                    onChange={handleChange} />
            </div>
            {/* Input Nome */}
            <div>
                <label htmlFor="file">Immagine Profilo</label>
                <input
                    id='file'
                    type="file"
                    placeholder='carica la tua immagine'
                    name='immagine'
                    onChange={handleChange} />
            </div>

            {/* Input Specializzazione */}

            <div>
                <label htmlFor="file">Seleziona una specializzazione</label>
                <select id='file'
                    name='specializzazione'
                    value={formData.specializzazione}
                    onChange={(event) => setSpecial(event.target.value)}>
                {special.map((spec, index) => (
                    <option key={spec.id} value={spec.specializzazione}>{spec.specializzazione}</option>
                ))}
                </select>

            </div>

            <div>
                <button className= "bnt" type='submit'>Salva i dati</button>
            </div>


        </form>

    )
}

export default DocRegForm