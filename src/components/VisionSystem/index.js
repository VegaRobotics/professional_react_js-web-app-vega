/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import FileSaver from "file-saver";
import pixelmatch from 'pixelmatch';
import * as S from './styles';

function VisionSystem() {
  const [webcamImage, setWebcamImage] = useState(null);
  const [savedImage, setSavedImage] = useState(null);
  const [diffImage, setDiffImage] = useState(null);
  const [diffPercentage, setDiffPercentage] = useState(null);
  const [approvedRange, setApprovedRange] = useState([0, 10]);
  const [imageClassName, setImageClassName] = useState("");
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [directory, setDirectory] = useState("");
  const [localStorageImage, setLocalStorageImage] = useState(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamImage(imageSrc);
    if(directory)
    FileSaver.saveAs(imageSrc, `${directory}/captured-image.png`)
    localStorage.setItem("webcamImage", imageSrc);
  }, [webcamRef, directory]);

  const compareImages = React.useCallback(() => {
    if (!savedImage && !localStorageImage) return;

    let img1,img2
    if(useLocalStorage){
      img1 = new Image();
      img1.src = localStorage.getItem("webcamImage");
      img2 = new Image();
      img2.src = localStorageImage;
    } else{
      img1 = new Image();
      img1.src = webcamImage;
      img2 = new Image();
      img2.src = URL.createObjectURL(savedImage);
    }
    img1.onload = () => {
      img2.onload = () => {
        const width = img1.width;
        const height = img1.height;

        const canvas1 = document.createElement("canvas");
        canvas1.width = width;
        canvas1.height = height;
        const ctx1 = canvas1.getContext("2d");
        ctx1.drawImage(img1, 0, 0);

        const canvas2 = document.createElement("canvas");
        canvas2.width = width;
        canvas2.height = height;
        const ctx2 = canvas2.getContext("2d");
        ctx2.drawImage(img2, 0, 0);

        const img1Data = ctx1.getImageData(0, 0, width, height);
        const img2Data = ctx2.getImageData(0, 0, width, height);

        const diff = new ImageData(width, height);

        const diffPixels = pixelmatch(img1Data.data, img2Data.data, diff.data, width, height, {threshold: 0.1});
        setDiffPercentage((diffPixels / (width * height)) * 100);
        
        setImageClass(diffPercentage, approvedRange);

        const diffCanvas = document.createElement("canvas");
        diffCanvas.width = width;
        diffCanvas.height = height;
        const diffCtx = diffCanvas.getContext("2d");
        diffCtx.putImageData(diff, 0, 0);
        setDiffImage(diffCanvas.toDataURL());
      }
    }
  }, [savedImage, approvedRange, webcamImage, localStorageImage, useLocalStorage]);

  console.log(diffPercentage)
  console.log(approvedRange)
  // console.log(webcamImage)


  const setImageClass = React.useCallback((diffPercentage, approvedRange) => {
    if (diffPercentage >= approvedRange[0] && diffPercentage <= approvedRange[1]) {
      setImageClassName("image-match");
      setModal(true);
      setModalText("Approved");
    } else {
      setImageClassName("image-mismatch");
      setModal(true);
      setModalText("Rejected");
    }
  }, [diffPercentage, approvedRange]);

  const closeModal = React.useCallback(() => {
    setModal(false);
  }, []);

  return (
    <S.Container>
      <S.WebCam>
        <h1>Imagem em Tempo Real</h1>
        <Webcam
        ref={webcamRef}
        width={320}
        height={240}
        />
      </S.WebCam>
      <S.ImageStorage>
        <h1>Imagem Capturada</h1>
        <img src={localStorage.getItem("webcamImage")} alt="Captured Webcam Image" />
      </S.ImageStorage>
      <S.Range>
        <div>
            <h1>Approved range:</h1>
            <input type="number" min={0} max={100} value={approvedRange[0]} onChange={e => {
                if (e.target.value > approvedRange[1]) {
                    setApprovedRange([approvedRange[1], approvedRange[1]]);
                } else {
                    setApprovedRange([e.target.value, approvedRange[1]]);
                }
            }}/>
            <h1>-</h1>
            <input type="number" min={0} max={100} value={approvedRange[1]} onChange={e => {
                if (e.target.value < approvedRange[0]) {
                    setApprovedRange([approvedRange[0], approvedRange[0]]);
                } else {
                    setApprovedRange([approvedRange[0], e.target.value]);
                }
            }}/>
            <h1>%</h1>
          </div>
      </S.Range>
      <S.Button>
          <button onClick={capture}>Capture Image</button>
          {/* <input type="file" onChange={e => setSavedImage(e.target.files[0])} /> */}
          <button onClick={() => {
              setLocalStorageImage(localStorage.getItem("webcamImage"));
              setUseLocalStorage(!useLocalStorage);
            }}>Use Local Storage Image</button>
          <button onClick={compareImages}>Compare Images</button>
      </S.Button>
      <S.Result>
        {/* {diffPercentage ? `Images are ${diffPercentage.toFixed(2)}% different` : null}
        {diffImage && <img src={diffImage} className={imageClassName} style={{ width: '320px', height: '240px' }} />} */}
      </S.Result>
    {/* <input type="text" placeholder="Enter directory to save image" onChange={e => setDirectory(e.target.value)} /> */}
    
      <S.Modal>
        {modal && <div className="modal">
          <p>{modalText} {diffPercentage ? `(${diffPercentage.toFixed(2)}%)` : null}
          </p>
          <button onClick={closeModal}>Close</button>
        </div>}
      </S.Modal>
  </S.Container>
);
}
export default VisionSystem;