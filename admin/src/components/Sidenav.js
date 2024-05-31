import React, { useEffect } from "react";

function Sidenav(params) {

    let userType=JSON.parse(sessionStorage.getItem('userData'));
    // alert(userType.userType);
    const currentUser = userType.name;
    
    
    return (
        
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        { userType.userType==="adm"?
                        <>
                            <a className="nav-link" href="/RegisterUser">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Register User
                            </a>    
                        
                            <a className="nav-link" href="/ManageEmployees">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Manage Employees
                            </a>

                            <a className="nav-link" href="/ManageSecurityGuards">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Manage Security Guards
                            </a>
                            <a className="nav-link" href="/ManageMeetings">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Manage Meetings
                         </a>
                        </>
                        : userType.userType==="emp"?
                        <>
                            
                         <a className="nav-link" href="/ManageMeetings">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Manage Meetings
                         </a>
                         <a className="nav-link" href="/VisitorCharts">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Visitor Charts
                         </a>
                        </>
                        :
                        <>
                        <a className="nav-link" href="/RegisterVisitor">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Enter new visitor
                        </a>
                        <a className="nav-link" href="/ManageVisitors">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Manage Visitors
                        </a>
                        </>

                        }
                       
                       
                       
                        {/* <a className="nav-link" href="/Dashboard">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Manage visitors
                        </a> */}
                 
                        {/* <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                            Manage Visitors
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </a> 
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link" href="layout-static.html">Static Navigation</a>
                                    <a className="nav-link" href="layout-sidenav-light.html">Light Sidenav</a>
                                </nav>
                            </div>  */}






                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {currentUser}
                </div>
            </nav>
        </div>
        
 
    )
}

export default Sidenav;