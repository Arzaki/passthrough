import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidenav from "../components/Sidenav";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {  toast } from 'react-toastify';
// import { position } from "html2canvas/dist/types/css/property-descriptors/position";



function VisitorConfirmationPage() {

    const location = useLocation();
    // let photo = location.state.formData.p_image;
    // let name = location.state.formData.name;
    // let email = location.state.formData.email;
    // let phoneNo = location.state.formData.phoneNo;
    // let employee = location.state.formData.employee;

    const data = location.id;
    // let id;
    const[userData,setuserData] = useState(['']);
    const[Image,setImage] = useState();
    const[ids,setid] = useState(['']);
    
    useEffect(()=>{

        axios.get("http://localhost:4000/api/getVisitorId").then((response)=>{
            console.log(response.data[0].vis_id)
            // setid(response.data[0].vis_id)
            setuserData(response.data)

            
            const navigationEntry = window.performance.getEntriesByType('navigation')[0];
            const isNavigationTypeRedirect = navigationEntry && navigationEntry.type === 'navigate';
        
            if (isNavigationTypeRedirect) {
              toast.success('Visitor Registered!');
            }
            
        });
    

// axios.get("http://localhost:4000/api/getVisitorData",{params:{id:ids}}).then((response)=>{
//     // console.log(response.data)
//     // console.log(response.data[0].vis_photo)
//     setuserData(response.data)
//     // setImage(response.data[0].vis_photo)
// })
    },[]);

  
    // function test() {
        
    //     const doc = new jsPDF();
    //     doc.text("Hello world!", 10, 10);
    //     doc.save("a4.pdf");
    // }

    // const onDownload = (e)=>{
    //     e.preventDefault();
    //     const ticket = document.getElementById('ticket');

    //     // const photo = document.createElement('img');
    //     // photo.src  = `http://localhost:4000/public/${val.vis_photo}`;
    //     // photo.alt = 'photo';
    //     // photo.style.maxWidth = '150px'

    //     // const titleDiv = document.querySelector('.ticket');
    //     // titleDiv.appendChild(photo);

    //     html2canvas(ticket)
    //     .then((canvas)=>{
    //         const imgData = canvas.toDataURL(`image/png`);
    //         const pdf = new jsPDF();
    //         var width = pdf.internal.pageSize.getWidth();
    //         var height = pdf.internal.pageSize.getHeight();
        
    //         pdf.addImage(imgData,'JPEG',5,5,width-10,height-10);
    //         pdf.save("test.pdf");
    //     })

    // }

    // const onDownload = (e) => {
    //     e.preventDefault();
    //     const ticket = document.getElementById('ticket');
    
    //     const photo = document.createElement('img');
    //     photo.src = `http://localhost:4000/public/${userData.vis_photo}`;
    //     photo.alt = 'photo';
    //     photo.style.maxWidth = '150px';
    
    //     photo.onload = () => { // Wait for the image to load
    //         const titleDiv = document.querySelector('.ticket');
    //         titleDiv.appendChild(photo);
    
    //         html2canvas(ticket)
    //             .then((canvas) => {
    //                 const imgData = canvas.toDataURL('image/png');
    //                 const pdf = new jsPDF();
    //                 const width = pdf.internal.pageSize.getWidth();
    //                 const height = pdf.internal.pageSize.getHeight();
    
    //                 pdf.addImage(imgData, 'JPEG', 15, 15, 180, 180); // Adjust position and size as needed
    
    //                 pdf.save('test.pdf');
    //             });
    //     };
    // };
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return(
        <div>
            
            
            {/* <style type="text/css" media="print">{"\
            @media print {\
                @page {\
                  size: 100px 100px;\
                \}\
              }\
            "}</style> */}
            <Header/>
            <div id="layoutSidenav">
            <Sidenav/>
            <div id="layoutSidenav_content">
            
                    {/* <main>
                        <div className="container-fluid px-4">
                            <div className="row justify-content-center">
                                <div className="">
                                    <div className="">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Visitor Ticket </h3></div>
                                        <div className="card-body">
                                            <div>
                                                {userData.map((val)=>{
                                                    
                                                return(
                                                    <div classNameName="border border-primary ml1">
                                                    <br></br>
                                                    <div className="form-floating mb-3">
                                                        <img height={150} width={150}  src={"http://localhost:4000/public/"+val.vis_photo} alt="visitorPhoto"/> 
                                                     </div>
                                                    <div className="form-floating mb-3">
                                                        

                                                        <strong>Name:</strong>{val.vis_name}

                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        
                                                        <strong>Email Address:</strong> {val.vis_email}
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        
                                                        <strong>Phone no:</strong> {val.vis_phoneNo}
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <strong>Attendee:</strong> {val.vis_attendee}
                                                            
                                                    </div>
                                                    
                                                    
                                                    
                                                    </div>
                                                )})}
                                                <br></br>
                                                <div className="form-floating mb-3">
                                                    
                                                    
                                                    <button type="submit" value="Register" className="btn btn-primary">Print Ticket</button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main> */}
                    {/* //////////////////////////////FIRST TICKET DESIGN/////////////////////////////////////// */}
                                {/* {
                                    userData.map((val)=>{
                                        return(
                                            <>
                                            <div  id="ticket" ref={componentRef} className="card" style={{marginLeft:'300px',marginRight:'300px'}}>
                                                <div className="card-body mx-4">
                                                    <div className="container">
                                                    <p className="my-5 mx-5"  style={{fontSize:'30px'}}>Visitor Ticket</p>
                                                    <div className="row">
                                                    <div classNameName="form-floating">
                                                        <img classNameName="profile-picture" src={"http://localhost:4000/public/"+val.vis_photo} alt="VisitorPhoto"></img>
                                                    </div>
                                                    <ul className="list-unstyled form-floating">
                                                        <li className="text-black">{val.vis_name}</li>
                                                        <li className="text-muted mt-1"><span className="text-black">Visitor</span> #{val.vis_id}</li>
                                                        
                                                        </ul>
                                                        <hr></hr>
                                                        <div className="col-xl-10">
                                                        <strong><p>Phone Number:</p></strong>
                                                        </div>
                                                        <div className="col-xl-2">
                                                        <p className="float-end">{val.vis_phoneNo}
                                                        </p>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-10">
                                                        <strong><p>Email:</p></strong>
                                                        </div>
                                                        <div className="col-xl-2">
                                                        <p className="float-end">{val.vis_email}
                                                        </p>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-10">
                                                        <strong><p>Attendee:</p></strong>
                                                        </div>
                                                        <div className="col-xl-2">
                                                        <p className="float-end">{val.vis_attendee}
                                                        </p>
                                                        </div>
                                                        <hr  style={{border:'2px solid black'}}></hr>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-10">
                                                        <strong><p>In-Time:</p></strong>
                                                        </div>
                                                        <div className="col-xl-2">
                                                        <p className="float-end">{val.vis_inTime}
                                                        </p>
                                                        </div>
                                                        <hr  style={{border:'2px solid black'}}></hr>
                                                    </div>
                                                    
                                                    
                                                    

                                                    </div>
                                                    
                                                </div>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    
                                                    
                                                    <button onClick={handlePrint} type="button" value="Register" className="btn btn-primary ">Print Ticket</button>
                                                </div>
                                            </>
                                        )
                                    })
                                } */}
                    {/* //////////////////////////////SECOND TICKET DESING///////////////////////////////////// */}
                                {
                                    userData.map((val)=>{
                                        return(

                                            <>
                                        <div className="d-flex container mt-5">
                                        <div className="ticket-card" ref={componentRef}>
                                            <h1 className="ticket-visitor-heading">Visitor Card</h1>
                                            <img src={"http://localhost:4000/public/"+val.vis_photo} className="ticket-card-img-top" alt="Visitor Image"/>
                                            <div className=" d-flex flex-column justify-content-around ticket-card-body">
                                            <h5 className="card-title">{val.vis_name}</h5>
                                            
                                            <ul style={{'list-style-type':'none'}} className="list-group list-group-flush">
                                                <li className="ticket-list-group-item">
                                                <i className="bi bi-telephone"></i>
                                                <span><strong>Phone: </strong>{val.vis_phoneNo} </span>
                                                </li>
                                                <li className="ticket-list-group-item">
                                                <i className="bi bi-envelope"></i>
                                                <span><strong>Email: </strong>{val.vis_email} </span>
                                                </li>
                                                <li className="ticket-list-group-item">
                                                <i className="bi bi-calendar"></i>
                                                <span><strong>In-time: </strong>{val.vis_inTime}</span>
                                                </li>
                                                <li className="ticket-list-group-item">
                                                <i className="bi bi-person"></i>
                                                <span><strong>Attendee: </strong>{val.vis_attendee}</span>
                                                </li>
                                            </ul>
                                            </div>
                                        
                                        </div>
                                        
                                        </div>

                                        </>
                                    )
                                    })
                                }
                                <br></br>
                                <div>
                                                    
                                                    
                                                    <button onClick={handlePrint} type="button" value="Register" className="btn btn-primary ">Print Ticket</button>
                                                </div>
                                
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

export default VisitorConfirmationPage;