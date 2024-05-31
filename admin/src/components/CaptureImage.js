import React from "react";
import Webcam from "react-webcam";


function CaptureImage(){

    const videoConstraints = {
        width:500,
        height:500
    };

    const webcamRef = React.useRef(null);
    const takePicture = React.useCallback(
        ()=>{
            const imageSrc = webcamRef.current.getScreenshot();
            console.log(imageSrc)

        },
        [webcamRef]
    );

    
    

    return(
        <div>
            <Webcam
            videoConstraints={videoConstraints}
            ref = {webcamRef}
            />
            <button onClick={takePicture} className="btn btn-primary"><i className="fa fa-camera"></i></button>
        </div>
    )
}

export default CaptureImage;