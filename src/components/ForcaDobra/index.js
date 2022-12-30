import React, { useState, useEffect } from 'react';
import * as S from './styles';

export default function FCorte() {
  const [nro1, setNro1] = useState(0);
  const [nro2, setNro2] = useState(0);
  const [nro3, setNro3] = useState(0);
  // const [nro4, setNro4] = useState(0);
  const [resultado, setResultado] = useState(0);
  // const [operacao, setOperacao] = useState('Somar');

  const calcular = () => {
    return (((parseFloat(nro1)*parseFloat(nro2)*parseFloat(nro3))*0.00010197)*1/3);
  }

  useEffect(()=>{
    setResultado(calcular())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nro1,nro2,nro3])

  return (
    <S.Container>
          <S.Calc>
            <h1>Bending Force</h1>
            <label>Material Rupture Limit (MPa)</label>
            <input 
              type="number"
              value={nro1}
              onChange={(e) => setNro1(e.target.value)}/>      
            <label>Warp Perimeter (mm)</label>
              <input 
                type="number"
                value={nro2}
                onChange={(e) => setNro2(e.target.value)}/>      
            <label>Thickness (mm)</label>
             <input 
                type="number"
                value={nro3}
                onChange={(e) => setNro3(e.target.value)}/> 
            {/* <label>Shear Stress for Low Carbon Steel (kg/mm²)</label>
             <input 
                type="number"
                value={40}
                onChange={(e) => setNro4(e.target.value)}/>  */}
            <span>The bending effort will be: {resultado} Toneladas</span>     
            <span>The value of the plate press will be:: {(((nro1*nro2*nro3*0.00010197)*1/3)*0.10)} Toneladas</span>     
          </S.Calc>
    </S.Container>
  );
  }