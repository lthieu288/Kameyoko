import React from 'react'
const  Footer = () => {
    return (
        <>
            <div >
                <footer
                    className="text-center text-lg-start text-white"
                    style={{backgroundColor: "#1c2331"}}
                >
                    <section
                        className="d-flex justify-content-between p-4"
                        style={{backgroundColor: "#6351ce"}}
                    >
                        <div className="me-5">
                            <span>Get connected with us on social networks:</span>
                        </div>
                        <div>
                            <a href="" className="text-white me-4">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="" className="text-white me-4">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="" className="text-white me-4">
                                <i className="fab fa-google"></i>
                            </a>
                            <a href="" className="text-white me-4">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="" className="text-white me-4">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="" className="text-white me-4">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </section>
                    <section className="">
                        <div className="container text-center text-md-start mt-5">
                            <div className="row mt-3 namegroup">
                                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold">GROUP NAME</h6>
                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                        style={{width: "60px" , backgroundColor: "#7c4dff" , height: "2px"}}
                                    />
                                    <p>
                                        Here you can use rows and columns to organize your footer
                                        content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                        elit.
                                    </p>
                                </div>
                                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold">HELP</h6>
                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                        style={{width: "60px" , backgroundColor: "#7c4dff" , height: "2px"}}
                                    />
                                    <p>
                                        <a href="#!" className="text-white">Dinh Trong Khanh</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-white">Truong Gia Dat</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-white">Le Trung Hieu</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-white">19CLC10</a>
                                    </p>
                                </div>
                                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                    <h6 className="text-uppercase fw-bold">link</h6>
                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                        style={{width: "60px" , backgroundColor: "#7c4dff" , height: "2px"}}
                                    />
                                    <p>
                                        <a href="https://github.com/lthieu288/Kameyoko" className="text-white">github fe</a>
                                    </p>
                                    <p>
                                        <a href="https://github.com/Cpp4Life/kameyoko-webapp-backend" className="text-white">github be</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-white">hcmus</a>
                                    </p>
                                    <p>
                                        <a href="#!" className="text-white">Help</a>
                                    </p>
                                </div>
                                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                    <h6 className="text-uppercase fw-bold">Contact</h6>
                                    <hr
                                        className="mb-4 mt-0 d-inline-block mx-auto"
                                        style={{width: "60px" , backgroundColor: "#7c4dff" , height: "2px"}}
                                    />
                                    <p><i className="fas fa-home mr-3"></i> Nguyen Van Cu, Quan 5, HCM</p>
                                    <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                                    <p><i className="fas fa-phone mr-3"></i> + 012345678</p>
                                    <p><i className="fas fa-print mr-3"></i> + 012345678</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div
                        className="text-center p-3"
                        style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}
                    >
                       <p>HI MN NHOM MINH LA NHOM KAMEYOKO</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer