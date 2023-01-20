import React, { useState, useEffect } from 'react';
import * as S from './styles';

export default function PBruto() {
  const [nro1, setNro1] = useState(0);
  const [nro2, setNro2] = useState(0);
  const [resultado, setResultado] = useState(0);
  const [operacao, setOperacao] = useState('Somar');

  const calcular = () => {
    if(operacao==="Somar")
      return parseFloat(nro1) + parseFloat(nro2);
    else if (operacao==="Subtrair")
      return parseFloat(nro1)-parseFloat(nro2);
    else if (operacao==="Multiplicar")
      return parseFloat(nro1)*parseFloat(nro2);
    else
      return parseFloat(nro1)/parseFloat(nro2);
  }

  useEffect(()=>{
    setResultado(calcular())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nro1,nro2,operacao])

  return (
    <S.Container>
        <h1>gross weight</h1>
          <S.Calc>
            <label>Passo</label>
            <input 
              type="number"
              value={nro1}
              onChange={(e) => setNro1(e.target.value)}/>      
          </S.Calc>
          <S.Calc>
          <label>Largura</label>
            <input 
              type="number"
              value={nro2}
              onChange={(e) => setNro2(e.target.value)}/>      
          </S.Calc>
          <S.Calc>
            <select onChange={(e) => setOperacao(e.target.value)}>
              <option>Somar</option>
              <option>Subtrair</option>
              <option>Multiplicar</option>
              <option>Dividir</option>
            </select>     
          </S.Calc>
          <S.Calc>
            <label>Resultado{resultado}</label>
          </S.Calc>
    </S.Container>
  );
  }