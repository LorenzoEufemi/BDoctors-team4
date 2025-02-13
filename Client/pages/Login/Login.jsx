import DocRegForm from "../../components/main/DocRegForm";

function Login() {
    return (
        <div className="registrazione">
            <h3 className="text-center pt-5 titolo">Non ancora registrato?</h3>
            <h5 className="text-center sottotitolo">Compila il form</h5>
            <section className="container">
                <DocRegForm />
            </section>
        </div>
    )
};

export default Login;