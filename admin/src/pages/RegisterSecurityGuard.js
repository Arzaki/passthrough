import React from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";


function RegisterSecurityGuard(){
    return(
        <div>
            <Header/>
            <div id="layoutSidenav">
                <Sidenav/>
            <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <div className="row justify-content-center">
                                <div className="">
                                    <div className="">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Security Guard Registration</h3></div>
                                        <div className="card-body">
                                            <form>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" id="inputName" type="text" placeholder="Name" />
                                                    <label htmlFor="inputName">Name</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" id="inputEmail" type="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" placeholder="name@example.com" required />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" id="inputPhoneNumber" type="tel" pattern="[0-9]{10}" placeholder="Phone no." maxlength="10" required/>
                                                    <label htmlFor="inputPhoneNumber">Phone No.</label>
                                                </div>
                                                
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0  text-align:center">
                                                    
                                                    <input type="submit" value="Register" className="btn btn-primary"/>
                                                </div>
                                            </form>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Passthrough</div>
                                
                            </div>
                        </div>
                    </footer>
                </div>    
                
            </div>
        </div>
        
    )
}

export default RegisterSecurityGuard;