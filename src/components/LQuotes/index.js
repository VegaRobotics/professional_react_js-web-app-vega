import { useState } from 'react';
import * as S from './styles';
import emailjs from '@emailjs/browser';

function LQuotes() {
    const {name, setName} = useState('')
    const {email, setEmail} = useState('')
    const {message, setMessage} = useState('')
    const {select, setSelect} = useState('')

function sendEmail(e){
    e.preventDefault();

    if(name === '' || email === '' || message === ''){
        alert("Preencha todos os campos");
        return;
    }

    const templateParams = {
        from_name: name,
        select: select,
        message: message,
        email: email
    }

    emailjs.send("service_0em9x43", "template_t0fkzdn", templateParams, "jejqf22vllpv8NSLH")
    .then((response) => {
        console.log("EMAIL ENVIADO", response.status, response.text)
        setName('')
        setEmail('')
        setMessage('')
        setSelect('')
    }, (err) => {
        console.log("ERRO: ", err)
    })
}

    return (
        <S.Container>
            <S.Form>
                <h1>Faça uma Cotação</h1>
                {/* <h1>Contato</h1> */}
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
                        <select 
                            name="select"
                            onChange={(e) => setMessage(e.target.value)}
                            value={select} >
                            <option value="Rocker Arm Welder" selected>Estampos Progressivos</option>
                            <option value="Press Type Welder">Estampo Individuais</option>
                            <option value="Press Type Welder">Máquinas de Solda</option>
                            <option value="Press Type Welder">Máquinas de Montagem</option>
                            <option value="Press Type Welder">Máquinas Especiais</option>
                            <option value="Bench Welder">Dispositivos de Solda Resistência</option>
                            <option value="Seam Welder">Dispositivo de Solda MIG</option>
                            <option value="Butt Welder">Aplicações WEB</option>
                            <option value="Mid-Freq Inverter">Aplicações Mobile</option>
                            <option value="Multi-Spot Welder">Automações de Sistemas</option>
                            <option value="Gun Welder">Integração de Sistemas</option>
                            <option value="Miniature Gun Welder">Integração Robótica</option>
                        </select>
                        <input
                            className="textarea"
                            wrap="hard"
                            placeholder="Digite sua mensagem..."

                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
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
export default LQuotes;
