import React from 'react';
import styled from 'styled-components';
//import { shadow } from 'lib/styleUtils';
import oc from 'open-color';

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

// 너비, 그림자 설정
//const ShadowedBox = styled.div`
//    width: 500px;
//    ${shadow(2)}
//`;


const AuthContent = ({title, children, ButtonTitle}) => (

    <div>
        <Title>{title}</Title>
        {children}
        {ButtonTitle}
    </div>

);

const ButtonTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

export default AuthContent;