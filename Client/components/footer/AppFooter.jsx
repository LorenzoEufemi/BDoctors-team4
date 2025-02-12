function AppFooter() {
    return (
        <>
            <footer className='text-center text-white' style={{ backgroundColor: "rgba(23, 164, 138, 0.2)" }}>
                <div className='container p-4 pb-0'>
                    <section className='mb-4'>
                        <i className="fa-brands fa-facebook mx-2"></i>
                        <i className="fa-brands fa-instagram mx-2"></i>
                        <i className="fa-brands fa-google mx-2"></i>
                        <i className="fa-brands fa-twitter mx-2"></i>
                        <i className="fa-brands fa-linkedin mx-2"></i>
                    </section>
                </div>

                <div className='text-center p-3' style={{ backgroundColor: "rgba(23, 164, 138, 0.2)" }}>
                    © 2025 Copyright: BDoctors.com
                </div>
            </footer>
        </>
    )
};

export default AppFooter;