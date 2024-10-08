import React from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { localStorageLoginFlag } from "./constants";

function AdminLogin() {
  // function toastr(e) {
  //     e.preventDefault()
  //     toast.success("Login Successful!", {
  //         position: 'top-right',
  //         autoClose: 5000
  //     });

  // }

  function addData(e) {
    e.preventDefault();
    // var email='akash@gmail.com';
    // var pass='12345'
    // var userType='emp'
    var email = document.getElementById("inputEmail").value;
    var pass = document.getElementById("inputPassword").value;
    var userType = document.getElementById("userType").value;
    // alert(email);
    // alert(pass);

    axios
      .post("http://localhost:4000/api/loginData", {
        email: email,
        pass: pass,
        userType: userType,
      })
      .then((response) => {
        if (response.data.msg) {
          // alert(response.data.msg);
          toast.error(response.data.msg, {
            autoClose: 2000,
            position: "bottom-right",
          });
          console.log(response.data.msg, "if");
        } else {
          let obj = {
            name: response.data[0].user_name,
            userID: response.data[0].user_id,
            email: email,
            userType: userType,
          };
          sessionStorage.setItem("userData", JSON.stringify(obj));
          //   toast("Login Successful!");
          window.localStorage.setItem(localStorageLoginFlag, "true");
          console.log("SETTING ");
          window.location = "/Dashboard";
          //   alert("Login successful!");
        }
      });
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-start navbar-gradient text-white">
        <p className="poppins-bold h1 ms-4 ">Passthrough</p>
      </nav>
      <div id="layoutAuthentication">
      <div id="layoutAuthentication_content">
      <main>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4 poppins-bold">
                    Login
                  </h3>
                </div>
                <div className="card-body">
                  <form onSubmit={addData}>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputEmail"
                        type="email"
                        placeholder="name@example.com"
                      />
                      <label htmlFor="inputEmail">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="inputPassword"
                        type="password"
                        placeholder="Password"
                      />
                      <label htmlFor="inputPassword">Password</label>
                    </div>
                    <div className="form-floating mb-3">
                      <select
                        className="form-select"
                        id="userType"
                        aria-label="User Type"
                      >
                        <option value="sec">Security Guard</option>
                        <option value="emp">Employee</option>
                        <option value="adm">Admin</option>
                      </select>
                      <label htmlFor="userType">Type</label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        id="inputRememberPassword"
                        type="checkbox"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inputRememberPassword"
                      >
                        Remember Password
                      </label>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-4 mb-0">
                      <a className="small" href="password.html">
                        Forgot Password?
                      </a>
                      <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
        <div id="layoutAuthentication_footer">
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy; Passthrough</div>
                {/* <div>
                            <a href="www.google.com">Privacy Policy</a>
                            &middot;
                            <a href="www.google.com">Terms &amp; Conditions</a>
                        </div> */}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
