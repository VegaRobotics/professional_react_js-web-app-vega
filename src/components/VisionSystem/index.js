/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import FileSaver from "file-saver";
import pixelmatch from "pixelmatch";
import { Helmet } from "react-helmet";
import * as S from "./styles";

function VisionSystem() {
  const [imageClassName, setImageClassName] = useState("");
  const [modal, setModal] = useState(false);
  const [webcamImage, setWebcamImage] = useState(null);
  const [savedImage, setSavedImage] = useState(null);
  const [diffImage, setDiffImage] = useState(null);
  const [diffPercentage, setDiffPercentage] = useState(null);
  const [toleranceLevel, setToleranceLevel] = useState(100);
  const [directory, setDirectory] = useState("");
  const [localStorageImage, setLocalStorageImage] = useState(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  const [approvedRange, setApprovedRange] = useState([0, 10]);
  const [facingMode, setFacingMode] = useState('user');
  const modalText = diffPercentage && diffPercentage >= 95 ? "Aprovado" : "Reprovado";

  const webcamRef = useRef(null);
 
  const clearLocalStorage = () => {
    localStorage.clear();
    setLocalStorageImage(null);
  };

  const compareImages = useCallback(() => {
    if (!savedImage && !localStorageImage) return;
  
    const img1 = new Image();
    const img2 = new Image();
  
    img1.onload = () => {
      img2.onload = () => {
        const width = img1.width;
        const height = img1.height;
  
        const canvas1 = document.createElement("canvas");
        canvas1.width = width;
        canvas1.height = height;
        const ctx1 = canvas1.getContext("2d");
  
        const canvas2 = document.createElement("canvas");
        canvas2.width = width;
        canvas2.height = height;
        const ctx2 = canvas2.getContext("2d");
  
        const diffCanvas = document.createElement("canvas");
        diffCanvas.width = width;
        diffCanvas.height = height;
  
        const diff = new ImageData(width, height);
  
        setImageState(img1, img2, canvas1, canvas2, ctx1, ctx2, diff, diffCanvas);
      };
      if (useLocalStorage) {
        img2.src = localStorageImage;
      } else {
        img2.src = URL.createObjectURL(savedImage);
      }
    };
  
    if (useLocalStorage) {
      img1.src = localStorage.getItem("webcamImage");
    } else {
      img1.src = webcamImage;
    }
  }, [savedImage, webcamImage, localStorageImage, useLocalStorage, clearLocalStorage]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamImage(imageSrc);
    if (directory) {
      FileSaver.saveAs(imageSrc, `${directory}/captured-image.png`);
    }
    localStorage.setItem("webcamImage", imageSrc);
    compareImages();
  }, [webcamRef, directory, compareImages]);
  
  const setImageClass = useCallback(
    (diffPercentage, toleranceLevel) => {
      if (diffPercentage <= parseInt(toleranceLevel)) {
        setImageClassName("image-match");
        const modalText = diffPercentage && diffPercentage >= 95 ? "Aprovado" : "Reprovado";
        setModal(true);
      } else {
        setImageClassName("image-mismatch");
        setModal(true);
      }
    },
    []
  );
  
  const setImageState = useCallback((img1, img2, canvas1, canvas2, ctx1, ctx2, diff, diffCanvas) => {
    ctx1.drawImage(img1, 0, 0);
    ctx2.drawImage(img2, 0, 0);
  
    const img1Data = ctx1.getImageData(0, 0, img1.width, img1.height);
    const img2Data = ctx2.getImageData(0, 0, img2.width, img2.height);
  
    const diffPixels = pixelmatch(
      img1Data.data,
      img2Data.data,
      diff.data,
      img1.width,
      img1.height,
      { threshold: 0.1 }
    );
  
    setDiffPercentage((diffPixels / (img1.width * img1.height)) * 100);
    
    const diffPercentageAdjusted = (diffPixels / (img1.width * img1.height)) * 100;
    const [minRange, maxRange] = approvedRange;
    const toleranceLevel = 100 - ((diffPercentageAdjusted / maxRange) * 100);
    setImageClass(diffPercentageAdjusted, toleranceLevel);
  
    const diffCtx = diffCanvas.getContext("2d");
    diffCtx.putImageData(diff, 0, 0);
    setDiffImage(diffCanvas.toDataURL());
  }, [approvedRange, setImageClass, setDiffImage, setDiffPercentage]);
  
  
          

const closeModal = useCallback(() => {
  setModal(false);
}, [])



return (
  <S.Container>
    <Helmet>
      <title>Sistema de Visão</title>
      <meta name="description" content="Sistema de Visão" />
      <meta
        name="keywords"
        content="engenharia, engenharia atual, como ganhar dinheiro com a engenharia, engenharia século 21, engenharia moderna, sucesso na engenharia, consultoria em engenharia"
      />
      <meta name="author" content="Vega Robotics" />
    </Helmet>
    <S.WebCam>
      {/* <button onClick={() => setFacingMode(facingMode === 'environment' ? 'user' : 'user')}>Trocar câmera</button> */}
      <h1>Imagem em Tempo Real</h1>
      <Webcam ref={webcamRef} width={320} height={240} facingMode={'environment'} />
    </S.WebCam>
    <S.ImageStorage>
      <h1>Imagem Capturada</h1>
      <img
        src={localStorage.getItem("webcamImage")}
        alt="Captured Webcam Image"
      />
    </S.ImageStorage>
    <S.Range>
      <div>
        <h1>1º → Tolerance Level:</h1>
        <input
          type="number"
          min={0}
          max={100}
          value={toleranceLevel}
          onChange={(e) => {
            setToleranceLevel(e.target.value);
          }}
        />
        <h1>%</h1>
      </div>
    </S.Range>

    <S.Button>
    <button onClick={() => {
  capture();
  compareImages();
}}>2º → Capture Image</button>


  <button
    onClick={() => {
      setLocalStorageImage(localStorage.getItem("webcamImage"));
      setUseLocalStorage(!useLocalStorage);
    }}
  >
    3º → Use Local Storage Image
  </button>
  <button onClick={() => {
  capture();
  compareImages();
}}>4º → Compare Image</button>
  {/* <button onClick={compareImages}>Compare Images</button>
  <button onClick={clearLocalStorage}>Limpar Local Storage</button> */}
</S.Button>

    <S.Result>
      {diffPercentage
        ? `Images are ${diffPercentage.toFixed(2)}% different`
        : null}
      {diffImage && (
        <img
          src={diffImage}
          className={imageClassName}
          style={{ width: "320px", height: "240px" }}
          alt="Comparison Result"
        />
      )}
    </S.Result>
    <S.Modal>
  {modal && (
    <div className="modal">
      <p>
        {diffPercentage ? (
          `As imagens são ${diffPercentage.toFixed(2)}% diferentes.` 
        ) : (
          "As imagens não puderam ser comparadas."
        )}
        {diffPercentage && diffPercentage <= toleranceLevel
          ? " Aprovado."
          : " Reprovado."}
      </p>
      <button onClick={closeModal}>Fechar</button>
    </div>
  )}
</S.Modal>

  </S.Container>
);
}
export default VisionSystem;