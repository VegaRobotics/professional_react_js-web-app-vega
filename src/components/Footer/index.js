import React from 'react';
import * as S from './styles';
import logo from '../../assets/logo.svg';
import insta from '../../assets/insta.png';
import youtube from '../../assets/youtube.png';
// import link from '../../assets/link.png';
import whatsapp from '../../assets/whatsapp.png';
// import vixem from '../../assets/vixembeta.png';

function Footer() {
    return (
        <S.Container>
            <S.LeftSide>
                <a href="https://www.instagram.com/vega.robotics/" target="_blank" rel="noreferrer" >
                <img src={insta} className="insta" alt="insta"/>
                </a>

                <a href="https://www.youtube.com/channel/UCXrrWajAUavg6n2vghDR5AQ" target="_blank" rel="noreferrer" >
                <img src={youtube} className="youtube" alt="youtube"/>
                </a>

                {/* <a href="https://www.linkedin.com/company/vega-robotics-tech/?viewAsMember=true" target="_blank" rel="noreferrer" >
                <img src={link} className="link" alt="link" />
                </a> */}

                <a href="https://api.whatsapp.com/send/?phone=%2B551151998949&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" >
                <img src={whatsapp} className="link" alt="link" />
                </a>
            </S.LeftSide>
            <S.Center>
                <img src={logo} className="App-logo" alt="logo"/>
                <footer>Powered ReactJS</footer>
            </S.Center>
            <S.RightSide>
                <span>® Vega Robotics. Todos os Direitos Reservados.</span> 
                <br></br>
                <br></br>
                <a href="mailto:contato@vegarobotics.com.br">contato@vegarobotics.com.br</a>
            </S.RightSide>
        </S.Container>
    )
}
export default Footer;