import React from 'react';
import * as S from './styles';

import Header from '../../components/Header';
import KanbanBoard from '../../components/KanbanBoard';
import Footer from '../../components/Footer';

function ViewKanbanBoard() {
    return (
        <S.Container>
            <Header/>
            <KanbanBoard/>
            <Footer/>
        </S.Container>
    );
}
export default ViewKanbanBoard;