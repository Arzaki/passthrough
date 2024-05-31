import React from 'react';
import Sidenav from '../components/Sidenav';
import Header from '../components/Header'
import axios from 'axios';

import Webcam from 'react-webcam';
import { useState,useRef,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function RegisterVisitor(){

    // function openCamera() {
    //     return(
    //         <div>
    //             Testing 123
    //         </div>
    //     )
    // }

    ////////////////////////////////////////////////////////////////////////////////////////// 

    const [ p_image, setImageSrc] = useState('')
    const [isWebcamOpen,setWebcamOpen] = useState(false);
    const [EmployeeNames, setEmployeeNames] = useState(['']);

    const webcamRef = useRef(null);
    const navigate = useNavigate();

    useEffect(()=>{

        axios.get("http://localhost:4000/api/getEmployeeNames").then((response)=>{
         console.log(response.data)
        setEmployeeNames(response.data);

    })
    },[])
    


    const openWebcam = ()=>{
        setWebcamOpen(true);
    }
    const closeWebcam = ()=>{
        setWebcamOpen(false);
    }

    const capture = async(e)=>{
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);

        

        // const response = await fetch(imageSrc);
        // const blob = await response.blob();
    }


    //////////////////////////////////////////////////////////////////////////////////////////



    // const videoConstraints = {
    //     width:500,
    //     height:500
    // };

    // const webcamRef = React.useRef(null);
    // const takePicture = React.useCallback(
    //     ()=>{
    //         const imageSrc = webcamRef.current.getScreenshot();
    //         console.log(imageSrc)

    //     },
    //     [webcamRef]
    // );

    const addData=async(e)=>{

        e.preventDefault();

        var name = document.getElementById("inputName").value;
        var email = document.getElementById("inputEmail").value;
        var phoneNo = document.getElementById("inputPhoneNumber").value;
        var employee = document.getElementById("employee").value;
        // var image = p_image;
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
        
const response = await fetch(imageSrc);
        const blob = await response.blob();

        let formData = new FormData();
        formData.append("name", name)
        formData.append("email", email)
        formData.append("phoneNo", phoneNo)
        formData.append("employee", employee)

       
        formData.append("p_image",blob, "captured-image.jpg");

        // const data = formData;

        axios.post("http://localhost:4000/api/registerVisitor",formData,{headers:{"Content-Type":"multipart/form-data"}}).then(response =>{
            // alert('added');
            // console.log(formData)
            // <Link to={{
            //     pathname: "/VisitorConfirmationPage",
            //     state:formData
            // }} />
            window.location = "/VisitorConfirmationPage";
            // navigate('/VisitorConfirmationPage',{state:{id:formData}})
        }).catch(error => {
            console.error(error);
            alert("error!")
        });



        // axios.post("http://localhost:4000/api/registerVisitor",{name:name,email:email,phoneNo:phoneNo,employee:employee,image:image}).then((response)=>{
        //     alert("Successful!");
        // });
    }
    return (
        <div>
            <Header />
            <div id="layoutSidenav">
            <Sidenav/>
            <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <div className="row justify-content-center">
                                <div className="">
                                    <div className="">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Visitor Registration</h3></div>
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
                                                    <input className="form-control" id="inputPhoneNumber" type="tel" pattern="[0-9]{10}" placeholder="Phone no." maxLength="10" required/>
                                                    <label htmlFor="inputPhoneNumber">Phone No.</label>
                                                </div>
                                                <div className="form mb-3">
                                                    <label htmlFor="employee">Attendee: </label>
                                                        <select className="form-control" name="attendee" id="employee">
                                                            {EmployeeNames.map((val)=>{
                                                                return(
                                                                    <>
                                                                    <option value={val.user_name}>{val.user_name}</option>
                                                                    </>
                                                                )
                                                            })}
                                                            {/* <option value="Akash"> Akash</option>
                                                            <option value="Akshay">Akshay</option>
                                                            <option value="Suresh">Suresh</option>
                                                            <option value="Mahesh">Mahesh</option> */}
                                                        </select>
                                                </div>
                                                
                                                <div className="form mb-3">
                                                    <label htmlFor="cameraInput">Picture:</label>
                                                    {/* <button onClick={openCamera} classNameName='btn btn-primary'><i className="fa fa-camera"></i></button> OR   */}

                                                    {!isWebcamOpen && <button onClick={openWebcam}>Open camera</button>}
                                                    {isWebcamOpen && (
                                                        <>
                                                        <button onClick={capture}>Capture Photo</button>
                                                        <Webcam
                                                        audio={false}
                                                        ref={webcamRef}
                                                        height={300}
                                                        width={300}/>
                                                        
                                                        {p_image && <img  className="" src={p_image} alt="Captured" />}
                                                        
                                                        
                                                        
                                                        <button onClick={closeWebcam}>Close webcam</button>
                                                        </>
                                                    )}
                                                    
                                                    {/* <input  type="file" id="inputCamera" name="cameraInput" accept="image/*" capture="camera"/> */}
                                                    
                                                    

                                                </div>
                                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0  text-align:center">
                                                    
                                                    {/* <input type="submit" value="Register" className="btn btn-primary"/> */}
                                                    <button type="submit" value="Register" className="btn btn-primary">Register</button>
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

export default RegisterVisitor;