import React, { useEffect } from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";

function ManageSecurityGuards(){

    useEffect(()=>{
        const id = 'datatablesSimple'
        window.inittable(id)},[])

    
    return(
        <div>
            <Header/>
            <div id="layoutSidenav">
            <Sidenav/>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Manage Security Guards</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                            <li className="breadcrumb-item active">Security Guards</li>
                        </ol>
                        
                        <div className="card mb-4">
                            <div className="card-header">
                                <i className="fas fa-table me-1"></i>
                                Security Guards Database
                            </div>
                            <div className="card-body">
                                {/* <div className="float-end">
                                    <a href="RegisterSecurityGuard">
                                        <button className="btn btn-success">Add Security Guard</button>
                                    </a>
                                </div> */}
                                <table id="datatablesSimple">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone No.</th>
                                            <th>Options</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone No.</th>                                            
                                            <th>Options</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        <tr>
                                            <td>Tiger Nixon</td>
                                            <td>tigernixon@gmail.com</td>
                                            <td>9852347523</td>
                                            <td><button>Modify</button><button>Delete</button></td>
                                        </tr>
                                        
                                        
                                    </tbody>
                                </table>
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

export default ManageSecurityGuards;