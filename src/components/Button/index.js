import React from 'react'
import { ButtonText, Container } from './styles'

const Button = ({text, color, textColor, width, height, style}) => {
    return (

        <Container color={color} width={width} height={height} style={{...style}}>
            <ButtonText textColor={textColor}>{text}</ButtonText>
        </Container>
    )
}

export default Button