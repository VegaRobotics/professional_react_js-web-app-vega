// import React, { useState, useEffect, useRef } from "react;
import React from "react";
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';
// import video1 from '../../assets/video1.mp4';
// import video2 from '../../assets/video2.mp4';
// import video3 from '../../assets/video3.mp4';
import "./styles.css"

const SEngenharia = () => {
  // const [currentVideo, setCurrentVideo] = useState(null);
  // const videoRef1 = useRef(null);
  // const videoRef2 = useRef(null);
  // const videoRef3 = useRef(null);

  // useEffect(() => {
  //   if (currentVideo === video1) {
  //     videoRef1.current.play();
  //   } else if (currentVideo === video2) {
  //     videoRef2.current.play();
  //   } else if (currentVideo === video3) {
  //     videoRef3.current.play();
  //   } else {
  //     videoRef1.current.pause();
  //     videoRef1.current.currentTime = 0;
  //     videoRef2.current.pause();
  //     videoRef2.current.currentTime = 0;
  //     videoRef3.current.pause();
  //     videoRef3.current.currentTime = 0;
  //   }
  // }, [currentVideo, videoRef1, videoRef2, videoRef3]);

  // const handleMouseEnter = (video) => {
  //   setCurrentVideo(video);
  // }

  // const handleMouseLeave = () => {
  //   setCurrentVideo(null);
  // }

  return (
    <div className="screen">
      <div className="left-section">
        <img 
          src={image1} className="whats" alt="whats"
          // onMouseEnter={() => handleMouseEnter(video1)} 
          // onMouseLeave={handleMouseLeave}
        />
        {/* <video ref={videoRef1} src={video1} muted loop hidden/> */}
      </div>
      <div className="center-section">
        <img 
          src={image2} className="whats" alt="whats"
          // onMouseEnter={() => handleMouseEnter(video2)} 
          // onMouseLeave={handleMouseLeave}
        />
        {/* <video ref={videoRef2} src={video2} muted loop hidden/> */}
      </div>
      <div className="right-section">
        <img 
          src={image3} className="whats" alt="whats"
          // onMouseEnter={() => handleMouseEnter(video3)} 
          // onMouseLeave={handleMouseLeave}
        />
        {/* <video ref={videoRef3} src={video3} muted loop hidden/> */}
      </div>
    </div>
  );
};

export default SEngenharia;
