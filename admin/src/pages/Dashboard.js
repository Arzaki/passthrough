import React, { useEffect } from "react";
import Sidenav from "../components/Sidenav";
import Header from "../components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { localStorageLoginFlag } from "./constants";

function Dashboard(){


    useEffect(()=>{

        
        if(window){

            const flagValue = window.localStorage.getItem(localStorageLoginFlag)
            
            if(flagValue === 'true'){
                toast.success("Successfully logged in!",{autoClose:2000, position:'bottom-right'})
                console.log("lol")
                setTimeout(()=>{
                    window.localStorage.setItem(localStorageLoginFlag,'false');

                },1000)
            }
            // toast("yo")
            // console.log("yo",flagValue)
        }


        //     if(window){
    //         const flagValue = window.localStorage.getItem(localStorageLoginFlag)
    //         console.log({flagValue})
    //         if(flagValue === 'true' && toast){
    //             toast("Test")
    //             console.log("lol")
    //             window.localStorage.setItem(localStorageLoginFlag,'false');
    //         }

    //     }

    },[toast])

    return (


        <div>

            <Header/>
            <div id="layoutSidenav">
                <Sidenav/>
                <div id="layoutSidenav_content">
                    
                </div>
            </div>
        </div>
        )
}

export default Dashboard;