import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UpdateEmployee() {
  function updateUser() {
    var newName = document.getElementById("inputName").value;
    var newEmail = document.getElementById("inputEmail").value;
    var newPhoneNo = document.getElementById("inputPhoneNumber").value;

    axios
      .post("http://localhost:4000/api/UpdateEmployee", {
        newName: newName,
        newEmail: newEmail,
        newPhoneNo: newPhoneNo,
        id: id,
      })
      .then((response) => {
        if (response.data.msg) {
          // alert(response.data.msg)
          toast.error(response.data.msg, { position: "bottom-right" });
        } else {
          // alert("Data updated!");
          //   toast.success("Data updated", { position: "bottom-right" });
          setTimeout((window.location = "/ManageEmployees"), 5000);
        }
      });
  }
  const [userData, setuserData] = useState([""]);
  const location = useLocation();
  const id = location.state.id;
  // console.log("This is the id: " + id);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getSingleEmployeeName", {
        params: { id: id },
      })
      .then((response) => {
        console.log(response.data);
        setuserData(response.data);
      });
  }, []);

  return (
    <div>
      <Header />
      <div id="layoutSidenav">
        <Sidenav />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <div className="row justify-content-center">
                <div className="">
                  <div className="">
                    <div className="card-header">
                      <h3 className="text-center font-weight-light my-4">
                        Update Employee Details
                      </h3>
                    </div>
                    <div className="card-body">
                      <form>
                        {userData.map((val) => {
                          return (
                            <>
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  id="inputName"
                                  type="text"
                                  placeholder="Name"
                                  defaultValue={val.user_name}
                                />
                                <label htmlFor="inputName">Name</label>
                              </div>
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  id="inputEmail"
                                  type="email"
                                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                                  placeholder="name@example.com"
                                  defaultValue={val.user_email}
                                  required
                                />
                                <label htmlFor="inputEmail">
                                  Email address
                                </label>
                              </div>
                              <div className="form-floating mb-3">
                                <input
                                  className="form-control"
                                  id="inputPhoneNumber"
                                  type="tel"
                                  pattern="[0-9]{10}"
                                  placeholder="Phone no."
                                  maxlength="10"
                                  defaultValue={val.user_phoneNo}
                                  required
                                />
                                <label htmlFor="inputPhoneNumber">
                                  Phone No.
                                </label>
                              </div>
                              {/* <div className="form mb-3">
                                                <label htmlFor="employee">Attendee: </label>
                                                    <select className="form-control" name="attendee" id="employee">
                                                        <option value="Akash"> Akash</option>
                                                        <option value="Akshay">Akshay</option>
                                                        <option value="Suresh">Suresh</option>
                                                        <option value="Mahesh">Mahesh</option>
                                                    </select>
                                            </div> */}

                              {/* <div className="form mb-3">
                                                <img src={"http://localhost:4000/public/"} style={{width:'130px'}} />
                                                <label htmlFor="cameraInput">Picture:</label>
                                                <input type="file" id="inputCamera" name="cameraInput" accept="image/*" capture="camera"/>
                                                

                                            </div> */}
                              <div className="d-flex align-items-center justify-content-between mt-4 mb-0  text-align:center">
                                {/* <input type="submit" value="Register" className="btn btn-primary"/> */}
                                <button
                                  onClick={updateUser}
                                  type="submit"
                                  value="Register"
                                  className="btn btn-primary"
                                >
                                  Update
                                </button>
                              </div>
                            </>
                          );
                        })}
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
  );
}

export default UpdateEmployee;
