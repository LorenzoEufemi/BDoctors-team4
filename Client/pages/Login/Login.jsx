import { Navigate } from "react-router-dom";
import DocRegForm from "../../components/main/DocRegForm";

function Login() {
    return (
        <>
            <div className="registrazione">
                <button className="btn-back" onClick={() => Navigate(-1)}>
                    <i class="fa-solid fa-caret-left" style={{ color: "#4FBE89" }}></i>
                </button>
                <h3 className="text-center pt-5 titolo">Non ancora registrato?</h3>
                <h5 className="text-center sottotitolo">Compila il form</h5>
                <section className="container">
                    <DocRegForm />
                </section>
            </div>        
        </>
    )
};

export default Login;