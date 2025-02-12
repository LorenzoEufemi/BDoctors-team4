import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    const apiUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    // stati per form e specializzazioni
    const [formData, setFormData] = useState(initialData);
    const [special, setSpecial] = useState([]);

    // stato per errori
    const [error, setError] = useState([]);

    // funzione per gestire errori
    const isDataValid = () => {

        let errors = [];

        // controllo campi vuoti
        for (let key in formData) {
            if (key.trim() === "") {
                errors.push(`Il campo ${key} è obbligatorio`);
            };
        };

        // controllo nome
        if (formData.firstname.trim() !== "" && formData.firstname.length <= 3) {
            errors.push("Il nome deve avere almeno 3 caratteri");
        };

        // controllo cognome
        if (formData.lastname.trim() !== "" && formData.lastname.length <= 3) {
            errors.push("Il cognome deve avere almeno 3 caratteri");
        };

        // controllo email
        if (formData.email.trim() !== "" && !formData.email.includes("@")) {
            errors.push("L'email deve contenere la @");
        };

        // controllo indirizzo
        if (formData.address.trim() !== "" && formData.address.length <= 5) {
            errors.push("L'indirizzo deve avere almeno 5 caratteri");
        };

        // controllo numero telefono
        if (formData.phone.trim() !== "") {
            for (let i = 0; i < formData.phone.length; i++) {
                const char = formData.phone[i];

                // Verifica se ci sono caratteri non numerici o non "+"
                if ((char < '0' || char > '9') && char !== '+') {
                    errors.push("Il numero deve contenere solo numeri e il + iniziale");
                    break;
                };
                // Verifica se il "+" non è all'inizio (se presente)
                if (char === '+' && i !== 0) {
                    errors.push("Il numero deve contenere solo numeri e il + iniziale");
                    break;
                };
            };
        };
        return errors;
    };

    // chiamata specializzazioni
    useEffect(() => {
        axios.get(`${apiUrl}specializations`).then((resp) => {
            console.log(resp);
            setSpecial(resp.data.data);
        });
    }, []);

    // funzione per il cambiamento dei campi del form
    const handleChange = (event) => {
        const { name, value, files, type, checked } = event.target;

        if (files && files.length > 0) {

            // Se è un file, aggiorna l'oggetto formData senza perdere i dati esistenti
            setFormData(prevData => ({
                ...prevData,
                [name]: files[0]
            }));

        } else if (type === "checkbox") {
            setFormData(prevData => {
                // converte il valore in numero
                const valueAsNumber = Number(value);

                // usa "new Set" per evitare duplicati
                let updatedSpecializations = new Set(prevData.specializations);

                if (checked) {
                    // aggiunge la specializzazione selezionata
                    updatedSpecializations.add(valueAsNumber);
                } else {
                    // rimuove la specializzazione deselezionata
                    updatedSpecializations.delete(valueAsNumber);
                }

                return {
                    ...prevData,
                    // converte il Set di nuovo in array
                    specializations: [...updatedSpecializations]
                };
            });
        } else {
            // Se è un campo di testo, aggiorna normalmente
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        };
    };

    // funzione per submit
    const handleSubmit = (event) => {
        event.preventDefault();

        setError(false);

        // ottengo errori
        const validationErrors = isDataValid();

        if (validationErrors.length > 0) {

            // imposta gli errori nello state
            setError(validationErrors);

            // return che blocca l'invio del form
            return;
        };

        //creiamo oggetto formadata per simulare form -non usiamo json
        const dataToSend = new FormData();

        // prende tutte le chiavi aggiornate con i dati dell'utente
        for (let key in formData) {
            dataToSend.append(key, formData[key]);
        };

        console.log(dataToSend);

        // chiamata axios per inserirle nel db
        axios.post(`${apiUrl}doctors`, dataToSend, {

            // diciamo al server che tra i dati ci sono anche file
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((resp) => {
            console.log(resp);
            // rimanda alla homepage
            navigate("/");

        }).catch((err) => {
            console.error("Errore nell'invio", err);
        });
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
                    onChange={handleChange}
                    aria-describedby="passwordHelpBlock" />

                {/* se l'array non è vuoto verificare se almeno un elemento nell'array soddisfa la condizione */}
                {error.length > 0 && error.some(err => err.includes("nome")) && (
                    <p className="text-danger">{error.find(err => err.includes("nome"))}</p>
                )}
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

                {error && error.includes("errore nel cognome") && (
                    <p className='text-danger'>Cognome deve essere di almeno 3 caratteri</p>
                )}
            </div>

            {/* Input Email */}
            <div>
                <label htmlFor="email">Email</label>
                <input
                    id='email'
                    className='form-control'
                    type="text"
                    placeholder='scrivi la tua email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange} />

                {error && error.includes("errore nella email") && (
                    <p className='text-danger'>l'email deve contenere la @</p>
                )}
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

                {error && error.includes("errore nell'indirizzo") && (
                    <p className='text-danger'>l'indirizzo deve essere di almeno 5 caratteri</p>
                )}
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

                {error && error.includes("errore nel telefono") && (
                    <p className='text-danger'>il numero deve contenere solo numeri o il + iniziale</p>
                )}
            </div>

            {/* Input imagine */}
            <div>
                <label htmlFor="image">Immagine Profilo</label>
                <input
                    id='image'
                    className='form-control'
                    type="file"
                    placeholder='carica la tua immagine'
                    name='image'
                    onChange={handleChange} />
            </div>

            {/* Input CV */}
            <div>
                <label htmlFor="resume">Curriculum</label>
                <input
                    id='resume'
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
                    // al server mando id specializzazione
                    <div key={index} className="form-check form-check-inline col-3">
                        <input
                            key={spec.id}
                            className="form-check-input"
                            type="checkbox"
                            id={spec.id}
                            name='specializations'
                            value={spec.id}
                            checked={formData.specializations.includes(Number(spec.id))}
                            onChange={handleChange}
                        />
                        <label htmlFor={spec.id} className="form-check-label">{spec.specialization}</label>
                    </div>
                ))}
            </div>
            <div>
                <button className="btn btn-primary" type='submit'>Salva i dati</button>
            </div>
        </form>
    );
};

export default DocRegForm;