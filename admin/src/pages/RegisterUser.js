import React from 'react'
import Sidenav from '../components/Sidenav';
import Header from '../components/Header';
import axios from 'axios'

function RegisterUser(){

    function addData() {

        var name  = document.getElementById("inputName").value;
        var inputEmail = document.getElementById("inputEmail").value;
        var phoneNo = document.getElementById("inputPhoneNumber").value;
        var  userType = document.getElementById("userType").value;
        var  pass= document.getElementById("inputPassword").value;
        var confirmPass = document.getElementById('inputPasswordConfirm').value;

        if(pass == confirmPass){

            
            axios.post("http://localhost:4000/api/RegisterUserData",{name:name,inputEmail:inputEmail,phoneNo:phoneNo,userType:userType,pass:pass}).then((response)=>{
                alert("Successful!");
            })

        
        }else{
            alert("Both passwords don't match.");
        }

        
    }
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
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">User Registration</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={addData}>
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
                                                <div className="form mb-3">
                                                    <label htmlFor="userType" className="form mb-3">Type of User:</label>
                                                    <select name="userType" id="userType" className="form-control">Employee
                                                    <option value="emp">Employee</option>
                                                    <option value="sec">Security Guard</option>
                                                    </select>
                                                </div>
                                                <div className="form mb-3">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPassword" type="password" placeholder="Create a password" maxlength="20" required/>
                                                        <label htmlFor="inputPassword">Password</label>
                                                    </div>
                                                </div>
                                                <div className="form mb-3">
                                                    <div className="form-floating mb-3 mb-md-0">
                                                        <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" maxlength="20" required/>
                                                        <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                                    </div>
                                                </div>
                                               
                                                
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0  text-align:center">
                                                    
                                                    {/* <input type="submit" value="Register" className="btn btn-primary"/> */}
                                                    <button type='submit' className="btn btn-primary">Submit</button>
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

export default RegisterUser;