import React from 'react';
import VideoS from '../../assets/videohome.mp4';
import * as S from './styles';

function Video() {
    return (
        <S.Container>
            <S.SVideo>
                <video id="videoBanner" className="SVideo" autoPlay muted loop>
                    <source src={VideoS} type='video/mp4'></source>
                </video>
                
            </S.SVideo>
            <S.SText>
            <span>Desenvolvimento e Integração de Soluções
                    <br/>
                        de Engenharia, Tecnologia e Robótica</span>
            </S.SText>
            
        </S.Container>
    );
}
export default Video;