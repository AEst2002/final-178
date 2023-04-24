import React from 'react'
import { ButtonText, Container } from './styles'

const Button = ({text, color, textColor, width, height, style, onClick}) => {
    return (

        <Container onClick={onClick} color={color} width={width} height={height} style={{...style}}>
            <ButtonText textColor={textColor}>{text}</ButtonText>
        </Container>
    )
}

export default Button