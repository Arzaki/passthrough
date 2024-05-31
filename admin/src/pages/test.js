import React, { useState } from "react";
import Webcam from "react-webcam";

function test() {


    const [ p_image, setImageSrc] = useState('')
    const [isWebcamOpen,setWebcamOpen] = useState(false);
    const webcamRef = useRef(null);


    const openWebcam = ()=>{
        setWebcamOpen(true);
    }
    const closeWebcam = ()=>{
        setWebcamOpen(false);
    }

    const capture = async()=>{
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);

    }

    return (
        <div>
            {!isWebcamOpen && <button onClick={openWebcam}>Open camera</button>}
            {isWebcamOpen && (
                <>
                <Webcam
                audio={false}
                ref={webcamRef}/>
                
                
                <button onClick={capture}>Capture Photo</button>
                
                {p_image && <img src={p_image} alt="Captured"/>}
                <button onClick={closeWebcam}>Close webcam</button>
                </>
            )}
        </div>
    )
}

export default test;