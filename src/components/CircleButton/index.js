import React from 'react'
import { Container } from './styles'

const CircleButton = ({icon, style}) => {
    return (
        <Container style={{...style}}>
            <img src={icon} style={{width: '20px', height: '20px'}} alt="A small button" />
        </Container>
    )
}

export default CircleButton