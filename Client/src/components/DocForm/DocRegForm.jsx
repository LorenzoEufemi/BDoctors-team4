import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GlobalContext from '../../context/GlobalContext';

const initialData = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    image: null,
    resume: null,
    specializations: "",
};


function DocRegForm() {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const { setIsSuccess } = useContext(GlobalContext);

    // stati per form e specializzazioni
    const [formData, setFormData] = useState(initialData);
    const [special, setSpecial] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // stato per errori
    const [error, setError] = useState([]);

    // funzione per gestire errori
    const isDataValid = () => {

        let errors = {};

        // controllo nome
        if (formData.firstname.length <= 3) {
            errors.firstname = "Il nome deve avere almeno 3 caratteri";
        };

        // controllo cognome
        if (formData.lastname.length <= 3) {
            errors.lastname = "Il cognome deve avere almeno 3 caratteri";
        };

        // controllo email
        if (!formData.email.includes("@")) {
            errors.email = "L'email deve contenere la @";
        };

        // controllo indirizzo
        if (formData.address.length <= 5) {
            errors.address = "L'indirizzo deve avere almeno 5 caratteri";
        };

        // controllo citta
        if (formData.city.length <= 1) {
            errors.city = "Il nome della città non è valido";
        };

        // controllo numero telefono
        // verifica che il numero sia di almeno 10 caratteria
        if (formData.phone.length < 10) {
            errors.phone = "Il numero di telefono deve essere di 10 caratteri";

            // verifica sui simboli nel numero
        } else if (!/^\+?[0-9]+$/.test(formData.phone)) {
            errors.phone = "Il numero di telefono deve contenere solo numeri";
        };

        // controllo file immagine
        if (formData.image === null) {
            errors.image = "L'immagine profilo è necessaria";
        };

        // controllo file CV
        if (formData.resume === null) {
            errors.resume = "Il caricamento del CV è necessario";
        };

        // controllo specilizzazioni
        if (formData.specializations.length === 0) {
            errors.specializations = "E' necessario scegliere almeno una specilizzazione";
        }
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

        setError({});

        // ottengo errori
        const validationErrors = isDataValid();

        // se sono presenti delle chiavi errore 
        if (Object.keys(validationErrors).length > 0) {

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
            setIsSuccess(true)
            // rimanda alla homepage
            navigate("/");

        }).catch((err) => {
            console.error("Errore nell'invio", err);
        });
    };

    return (

        <form className='d-flex flex-column gap-3 row-gap-5 py-4' onSubmit={handleSubmit}>
            <div className='row justify-content-lg-between justify-content-sm-center top-form gap-5'>
                {/* dati anagrafici */}
                <div className='card p-3 col-lg-4 col-md-12 dati-anagrafici'>
                    <h5 className='text-center py-1'>Dati anagrafici</h5>
                    <div className='d-flex flex-column justify-content-center nome'>
                        {/* Input Nome */}
                        <div className=''>
                            <label htmlFor="firstname">Nome*</label>
                            <input
                                id='firstname'
                                className='form-control'
                                type="text"
                                placeholder='il tuo nome'
                                name='firstname'
                                value={formData.firstname}
                                onChange={handleChange}
                                aria-describedby="passwordHelpBlock" />
                            {/* se l'array non è vuoto verificare se almeno un elemento nell'array soddisfa la condizione */}
                            {error.firstname && <span className="text-danger">{error.firstname}</span>}
                        </div>

                        {/* Input Cognome */}
                        <div className=''>
                            <label htmlFor="lastname">Cognome*</label>
                            <input
                                id='lastname'
                                className='form-control'
                                type="text"
                                placeholder='il tuo cognome'
                                name='lastname'
                                value={formData.lastname}
                                onChange={handleChange} />
                            {error.lastname && <span className="text-danger">{error.lastname}</span>}
                        </div>
                    </div>
                    <span className='mt-3' style={{fontSize : "0.6rem"}}>* Campo obbligatorio</span>
                </div>

                {/* contatti */}
                <div className='card row flex-column col-lg-7 col-sm-12 p-3 contatti-form'>
                    <h5 className='text-center py-1'>Contatti</h5>
                    <div className='row flex-column g-2'>
                        {/* Input Email */}
                        <div>
                            <label htmlFor="email">Email*</label>
                            <input
                                id='email'
                                className='form-control'
                                type="text"
                                placeholder='la tua email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange} />
                            {error.phone && <span className="text-danger">{error.phone}</span>}
                        </div>

                        {/* Input Indirizzo */}
                        <div>
                            <label htmlFor="address">Indirizzo*</label>
                            <input
                                id='address'
                                className='form-control'
                                type="text"
                                placeholder='il tuo indirizzo'
                                name='address'
                                value={formData.address}
                                onChange={handleChange} />
                            {error.address && <span className="text-danger">{error.address}</span>}
                        </div>

                        {/* Input Città */}
                        <div>
                            <label htmlFor="city">Città*</label>
                            <input
                                id='city'
                                className='form-control'
                                type="text"
                                placeholder='la tua città'
                                name='city'
                                value={formData.city}
                                onChange={handleChange} />
                            {error.city && <span className="text-danger">{error.city}</span>}
                        </div>

                        {/* Input Telefono */}
                        <div>
                            <label htmlFor="phone">Telefono*</label>
                            <input
                                id='phone'
                                className='form-control'
                                type="text"
                                placeholder='il tuo telefono'
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange} />
                            {error.phone && <span className="text-danger">{error.phone}</span>}
                        </div>
                    </div>
                    <span className='mt-3' style={{fontSize : "0.6rem"}}>* Campo obbligatorio</span>
                </div>
            </div>

            <div className='row justify-content-lg-between justify-content-md-center bottom-form gap-md-5'>
                {/* Files */}
                <div className='card p-3 col-lg-4 col-md-12 files'>
                    <h5 className='text-center py-3'>I tuoi file</h5>
                    <div className='d-flex flex-column gap-3 justify-content-center'>
                        {/* Input imagine */}
                        <div>
                            <label htmlFor="image">Immagine Profilo*</label>
                            <input
                                id='image'
                                className='form-control'
                                type="file"
                                placeholder='carica la tua immagine'
                                name='image'
                                onChange={handleChange} />
                            {error.image && <span className="text-danger">{error.image}</span>}
                        </div>

                        {/* Input CV */}
                        <div>
                            <label htmlFor="resume">Curriculum*</label>
                            <input
                                id='resume'
                                className='form-control'
                                type="file"
                                placeholder='carica il tuo CV'
                                name='resume'
                                onChange={handleChange} />
                            {error.resume && <span className="text-danger">{error.resume}</span>}
                        </div>
                    </div>
                    <span className='mt-3' style={{fontSize : "0.6rem"}}>* Campo obbligatorio</span>
                </div>

                {/* Input Specializzazione */}
                <div className='card row flex-column col-lg-7 col-md-12 p-3 specializzazione-form'>
                    <h5 className='text-center py-3'>Scegli una o più specializzazioni</h5>
                    <div className='d-flex flex-wrap justify-content-between align-items-start gap-2'>
                        <button
                            className="btn dropdown-btn col-12"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ backgroundColor: "rgba(23, 164, 138, 0.4)", color: "white" }}
                        >
                            {isOpen ? "chiudi" : "specializzazioni"}
                        </button>
                        <div className='d-flex flex-wrap align-items-center justify-content-between'>
                            <button className="btn dropdown-btn col-12" type="button" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "chiudi" : "specializzazioni"}</button>
                            <div className='row align-items-center'>
                                {special.map((spec, index) => (
                                    <div key={index} className='col-5'>

                                        {/* // al server mando id specializzazione */}
                                        <div className="form-check form-check-inline check-lg">
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

                                        {/* visualizzazione mobile */}
                                        <div className="dropdown-container relative">
                                            {isOpen && (
                                                <div className="absolute form-check form-check-inline col-lg-3 col-sm-6 filter-dropdown check-sm">
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
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {error.specializations && <span className="text-danger">{error.specializations}</span>}
                            </div>
                        </div>
                    </div>
                    <span className='mt-3' style={{fontSize : "0.6rem"}}>* Campo obbligatorio</span>
                </div>
            </div>

            {/* bottone submit */}
            <div className='btn-area d-flex justify-content-center'>
                <button className="btn btn-primary" type='submit'>Salva i dati</button>
            </div>
        </form>
    );
};

export default DocRegForm;