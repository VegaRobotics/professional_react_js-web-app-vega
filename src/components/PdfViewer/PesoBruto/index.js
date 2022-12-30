import React, { useState, useEffect } from 'react';
import * as S from './styles';

export default function PBruto() {
  const [nro1, setNro1] = useState(0);
  const [nro2, setNro2] = useState(0);
  const [nro3, setNro3] = useState(0);
  const [nro4, setNro4] = useState(0);
  const [resultado, setResultado] = useState(0);
  // const [operacao, setOperacao] = useState('Somar');

  const calcular = () => {
    return (parseFloat(nro1)*parseFloat(nro2)*parseFloat(nro3)*parseFloat(0.00000785))*1000;
  }

  useEffect(()=>{
    setResultado(calcular())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nro1,nro2,nro3,nro4])

  return (
    <S.Container>
        <h1>Gross Weight Carbon Steel</h1>
          <S.Calc>
            <label>Step (mm)</label>
            <input 
              type="number"
              value={nro1}
              onChange={(e) => setNro1(e.target.value)}/>      
            <label>Width (mm)</label>
              <input 
                type="number"
                value={nro2}
                onChange={(e) => setNro2(e.target.value)}/>      
            <label>Thickness (mm)</label>
             <input 
                type="number"
                value={nro3}
                onChange={(e) => setNro3(e.target.value)}/> 
            <label>Specific Weight Carbon Steel (kg/mm³)</label>
             <input 
                type="number"
                value={0.00000785}
                onChange={(e) => setNro4(e.target.value)}/> 
            <span>The gross weight is: {resultado} grams</span>     
          </S.Calc>
    </S.Container>
  );
  }