import React, {useState, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import {GrNext, GrPrevious} from 'react-icons/gr'

const PdfViewer = ({pdf}) => {
    const {numPages, setNumPages} = useState(null);
    const {pageNumber, setPageNumber} = useState(1);
    const divRef = useRef()

    const onDocumentLoadSucess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const handleNextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(prevState => prevState + 1);
        }
    }

    const handlePreviusPage = () => {
        if (pageNumber > 1) {
            setPageNumber(prevState => prevState - 1);
        }
    }

    return (
        <div ref={divRef}>
            <div>{pageNumber} / {numPages}</div>
            <div style={{margin:'10px 0'}}>
                {pageNumber > 1 && <button onClick={handlePreviusPage}><GrPrevious /></button>}
                {pageNumber < numPages && <button onClick={handleNextPage}><GrNext /></button>}
        </div>
        <div style={{display:'flex', justifyContent:'center'}}>
            <Document file={pdf} onLoadSuccess={onDocumentLoadSucess}>
                <Page pageNumber={pageNumber} width={divRef.current?.clientWidth * 0.95}/>
            </Document>
        </div>
        </div>
    );
}

export default PdfViewer;