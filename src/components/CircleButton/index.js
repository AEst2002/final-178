import React from 'react'
import { Container } from './styles'

const CircleButton = ({icon, style, iconStyle, onClick}) => {
    return (
        <Container style={{...style}} onClick={onClick}>
            <img src={icon} style={{width: '20px', height: '20px', ...iconStyle}} alt="A small button" />
        </Container>
    )
}

export default CircleButton