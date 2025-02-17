import { useNavigate } from "react-router-dom";
import DocRegForm from "../../components/main/DocRegForm";

function Login() {
    const navigate = useNavigate();
    return (
        <>
            <div className="registrazione">
                <button className="btn-back z-3 position-fixed rounded-3" onClick={() => navigate(-1)}>
                    <i className="fa-solid fa-caret-left" style={{ color: "#4FBE89" }}></i>
                </button>
                <h3 className="text-center pt-5 titolo">Non ancora registrato?</h3>
                <h5 className="text-center sottotitolo">Compila il form</h5>
                <section className="container">
                    <DocRegForm />
                </section>
            </div>
        </>
    );
};

export default Login;