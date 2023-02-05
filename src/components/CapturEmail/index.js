import React, { useState } from 'react';
import * as S from './styles';
import emailjs from '@emailjs/browser';

function CapturEmail() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  function sendEmail(e) {
    e.preventDefault();

    if (name === '' || email === '') {
      alert('Preencha todos os campos');
      return;
    }

    const templateParams = {
      from_name: name,
      email: email,
    };

    emailjs
    //   .send("service_0em9x43", "template_t0fkzdn", templateParams, "jejqf22vllpv8NSLH")
      .send('service_8o40684', 'template_h74ot0x', templateParams, 'jejqf22vllpv8NSLH')
      .then(
        (response) => {
          console.log('EMAIL ENVIADO', response.status, response.text);
          setName('');
          setEmail('');
          alert('E-mail enviado com sucesso!');
        },
        (err) => {
          console.log('ERRO: ', err);
        }
      );
  }
  

  return (
    <S.Container>
      <S.Form>
        <h1>Receba seu e-book gratuitamente!</h1>
              <form onSubmit={sendEmail}>
                  <input
                    className="input"
                    type="latin-prose"
                    placeholder="Digite seu nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <input
                    className="input"
                    type="email"
                    placeholder="Digite seu email"
                    autocomplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <button 
                    className="button" 
                    type="submit" 
                  value="Enviar">ENVIAR</button>
                </form>
            </S.Form>
        </S.Container>
    );
}
export default CapturEmail;