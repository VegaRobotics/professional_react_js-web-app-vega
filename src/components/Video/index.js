import React from 'react';
import VideoS from '../../assets/videohome.mp4';
import * as S from './styles';

function Video() {
    return (
        <S.Container>
            <S.Text>
                <span>Innovators in industrial automation 
                    <br/>
                        technology design and consulting</span>
            </S.Text>
            <S.SVideo>
                <video id="videoBanner" className="SVideo" autoPlay muted loop>
                    <source src={VideoS} type='video/mp4'></source>
                </video>
            </S.SVideo>
        </S.Container>
    );
}
export default Video;